"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Keypair } from '@solana/web3.js';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function Instructions() {
  const { data: session } = useSession();
  const [isChecked, setIsChecked] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartTest = async () => {
    try {
      if (!session?.user?.eno) {
        throw new Error('Enrollment number not found in session');
      }

      // Generate keypair on the client side
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString('base64');

      // Store private key in browser cookie
      Cookies.set('privateKey', privateKey, { expires: 1 });

      const requestBody = {
        eno: session.user.eno,
        publicKey: publicKey
      };

      const response = await fetch('/api/generateKeys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to store public key');
      }

      toast.success('Keys generated successfully');

      // Fetch the stored public key from the API
      const data = await response.json();
      setPublicKey(data.publicKey);

    } catch (error) {
      console.error('Error generating keys:', error);
      toast.error('Failed to generate keys');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
            className={`px-6 py-2 font-bold text-white rounded ${isChecked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isChecked}
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
