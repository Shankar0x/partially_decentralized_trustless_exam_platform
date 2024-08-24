"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Keypair } from '@solana/web3.js';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Instructions() {
  const { data: session } = useSession();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const router = useRouter();

  const handleStartTest = async () => {
    try {
      setIsButtonDisabled(true); // Disable the button immediately after click

      if (!session?.user?.eno) {
        throw new Error('Enrollment number not found in session');
      }

      // Check if the roll number has already submitted the exam
      const ledgerResponse = await fetch(`/api/checkLedger?eno=${session.user.eno}`);
      const ledgerData = await ledgerResponse.json();

      if (ledgerData.submitted) {
        toast.error('You have already submitted the exam');
        setIsButtonDisabled(false);
        return;
      }

      // Generate keypair on the client side
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString('base64');

      // Store private key in browser cookie
      Cookies.set('privateKey', privateKey, { expires: 1 });

      const requestBody = {
        eno: session.user.eno,
        publicKey: publicKey,
      };

      const response = await fetch('/api/generateKeys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to store public key');
      }

      toast.success('Keys generated successfully');

      // Fetch the total number of documents from the /api/questionsCount endpoint
      const countResponse = await fetch('/api/questionsCount');
      const { count } = await countResponse.json();

      // Generate 4 random numbers from 1 to count
      const randomNumbers = generateRandomNumbers(1, count, 4);

      // Log the random numbers to the console
      console.log('Generated Random Numbers:', randomNumbers);

      // Save the random numbers as a cookie
      Cookies.set('randomNumbers', JSON.stringify(randomNumbers), { expires: 1 });

      router.push('/questions');
    } catch (error) {
      console.error('Error generating keys or fetching questions:', error);
      toast.error('Failed to generate keys or fetch questions');
      setIsButtonDisabled(false); // Re-enable the button if there's an error
    }
  };

  // Function to generate unique random numbers
  const generateRandomNumbers = (min, max, count) => {
    const numbers = new Set();
    while (numbers.size < count) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(rand);
    }
    return Array.from(numbers);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Toaster />
      <h1 className="text-4xl font-bold mb-4">Instructions</h1>
      <div className="w-full max-w-3xl">
        <div className="border border-gray-300 rounded p-4 h-96 overflow-y-scroll">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              className="mr-2"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agree" className="text-gray-700">
              I agree to the above terms and conditions of this exam
            </label>
          </div>
          <button
            onClick={handleStartTest}
            className={`px-6 py-2 font-bold text-white rounded ${isChecked && !isButtonDisabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isChecked || isButtonDisabled} // Disable based on both conditions
          >
            Start Test
          </button>
        </div>
      </div>
      {publicKey && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Your Public Key:</h2>
          <input
            type="text"
            value={publicKey}
            readOnly
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
      )}
    </div>
  );
}
