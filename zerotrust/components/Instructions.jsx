"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Instructions() {
  const { data: session } = useSession();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Instructions</h1>
      <div className="w-full max-w-3xl">
        <div className="border border-gray-300 rounded p-4 h-96 overflow-y-scroll">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            {/* Add more lorem ipsum text here as needed */}
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
            onClick={() => { /* Add your start test logic here */ }}
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
