import '@fortawesome/fontawesome-free/css/all.min.css';
const LoginForm = () => {
  return (
    <main className="relative bg-pageBg bg-cover bg-center bg-no-repeat ">
      <div className="absolute top-0 right-0 p-8 text-white text-6xl font-bold">
        <i className="fa-solid fa-shield-halved"></i> ZeroTrust
      </div>

      <div className="w-full h-screen flex justify-center items-center ">
        <aside className="bg-white w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
          <h1 className="text-center text-black font-light text-4xl rounded-t-xl m-0 py-4">Log In</h1>
          <form className="p-6">
            <input 
              type="text" 
              name="" 
              placeholder="Registration Number" 
              className="py-2 px-3 w-full text-black text-lg font-light outline-none mb-4 rounded-t-lg"
            />
            <input 
              type="password" 
              name="" 
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
  )
}
export default LoginForm;
