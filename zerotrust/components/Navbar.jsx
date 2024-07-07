"use client";
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signOut, useSession } from 'next-auth/react';

const Navbar = ({ logoSrc }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="text-white text-3xl font-bold flex items-center">
          <i className="fa-solid fa-shield-halved"></i> ZeroTrust
        </div>
        <div className="flex items-center">
          {session?.user?.pfp && (
            <img
              src={session.user.pfp}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full mr-2 cursor-pointer"
              onClick={handleProfileClick}
            />
          )}
          <div className="relative flex items-center">
            <div className="text-white mr-2">
              <div>{session?.user?.name}</div>
              <div className="text-sm text-gray-400">{session?.user?.eno}</div>
            </div>
            <div className="cursor-pointer" onClick={toggleDropdown}>
              <i className="fa-solid fa-caret-down text-white"></i>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg z-50" style={{ top: '100%' }}>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left bg-red-500 text-white font-bold px-4 py-2"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <img
              src={session?.user?.pfp}
              alt="Profile Picture"
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
