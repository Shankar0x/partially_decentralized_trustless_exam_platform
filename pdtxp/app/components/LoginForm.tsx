"use client";
import { useForm } from 'react-hook-form';
import { UserLogin } from '../models/user.model';
import { useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Notify from './notify';
import "react-toastify/dist/ReactToastify.min.css";
import { showToast } from './notify';



const LoginForm = () => {
  const { v4: uuidv4 } = require('uuid');
  const authTokenValue = uuidv4();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<UserLogin>();

  const onSubmit = async (data: UserLogin) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_PATH}user/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(endpoint, options);
      const logMsg = await res.json();
      if (res.status === 200) {
        console.log("Correct creds");
        showToast(logMsg.message, "success");
        reset();
        document.cookie = "authToken=" + authTokenValue + ";path=/";
        router.push('/instructions');
      } else {
        console.log("Wrong creds");
        showToast(logMsg.message, "error");
      }
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  return (
    <>
      <Notify />
      <main className="relative bg-pageBg bg-cover bg-center bg-no-repeat ">
        <div className="absolute top-0 right-0 p-8 text-white text-6xl font-bold">
          <i className="fa-solid fa-shield-halved"></i> ZeroTrust
        </div>
        <div className="w-full h-screen flex justify-center items-center ">
          <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
            <h1 className="text-center text-black font-light text-4xl rounded-t-xl m-0 py-4">Log In</h1>
            <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
              <input 
                type="text" 
                {...register("eno", { required: true })} 
                placeholder="Registration Number" 
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mb-4 rounded-t-lg"
              />
              <input 
                type="password" 
                {...register("pass", { required: true })} 
                placeholder="Password" 
                className="py-2 px-3 w-full text-black text-lg font-light outline-none mb-4 rounded-b-lg"
              />
              <div className="flex mt-5 justify-between items-center">
                <button type="submit" className="bg-black text-white font-medium py-2 px-8">Log In</button>
              </div>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
};

export default LoginForm;
