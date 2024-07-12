"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Instructions() {
  const { data: session } = useSession();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartTest = async () => {
    try {
      if (!session?.user?.eno) {
        throw new Error('Enrollment number not found in session');
      }

      const requestBody = {
        eno: session.user.eno
      };

      const response = await fetch('/api/generateKeys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to generate keys');
      }

      const data = await response.json();
      console.log('Public Key from Instructions:', data.publicKey);
      console.log('Private Key from Instructions:', data.privateKey);

      // Optionally update session with private key
      // if needed, using setSession from next-auth/react

    } catch (error) {
      console.error('Error generating keys:', error);
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
    </div>
  );
}
