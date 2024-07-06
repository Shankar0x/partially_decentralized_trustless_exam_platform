"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm(){

    const [eno, setEno] = useState("");
    const [pass, setPass] = useState("");  
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const res = await signIn('credentials', {
          eno, pass, redirect:false,
        });

        if(res.error){
          setError("Invalid Credentials");
          return;
        }
        
        router.replace("dashboard");

      } catch (error){
        console.log(error);
      }
    };

    return (
    <main className="relative bg-pageBg bg-cover bg-center bg-no-repeat ">
        <div className="absolute top-0 right-0 p-8 text-white text-6xl font-bold">
          <i className="fa-solid fa-shield-halved"></i> ZeroTrust
        </div>
        <div className="w-full h-screen flex justify-center items-center ">
          <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
            <h1 className="text-center text-black font-light text-4xl rounded-t-xl m-0 py-4">Log In</h1>
            <form onSubmit={handleSubmit} className="p-6">
              <input 
                onChange={(e) => setEno(e.target.value)}
                type="text" 
                placeholder="Registration Number" 
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mb-4 rounded-t-lg"
              />
              <input 
                onChange={(e) => setPass(e.target.value)}
                type="password" 
                placeholder="Password" 
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mb-4 rounded-b-lg"
              />
              <div className="flex mt-5 justify-between items-center">
                <button type="submit" className="bg-black text-white font-medium py-2 px-8">Log In</button>
              </div>
              {
                error && (
                  <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                  </div>
                )}
              
            </form>
          </aside>
        </div>
      </main>);
}