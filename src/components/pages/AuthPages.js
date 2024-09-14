import React, { useState } from 'react';
import AppleLogo from './images/apple-logo.svg';
import GoogleLogo from './images/google-logo.svg'; 

export default function AuthPages() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {isLoginPage ? (
        <>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md p-8">
              <h1 className="text-4xl font-bold mb-6">Sign In</h1>
              <div className="space-y-4 mb-4">
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-white hover:bg-gray-700 transition duration-150">
                  <img src={GoogleLogo} alt="Google logo" className="w-6 h-6" />
                  <span>Sign in with Google</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-white hover:bg-gray-700 transition duration-150">
                  <img src={AppleLogo} alt="Apple logo" className="w-6 h-6" />
                  <span>Sign in with Apple</span>
                </button>
              </div>
              <div className="my-4 border-t border-gray-700" />
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <div className="text-sm text-right">
                  <a href="#" className="text-purple-500 hover:underline">FORGOT YOUR PASSWORD?</a>
                </div>
                <button className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition duration-150">Sign In</button>
              </form>
              <div className="mt-6 text-center">
                <p>New to our services?</p>
                <button onClick={togglePage} className="text-purple-500 hover:underline">Sign Up</button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 bg-purple-600 rounded-l-[50px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-white text-center">
                <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-xl mb-8">New to our services?</p>
                <button
                  onClick={togglePage}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hidden lg:block lg:w-1/2 bg-purple-600 rounded-r-[50px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-white text-center">
                <h2 className="text-5xl font-bold mb-4">{'<SOMETHING TO WRITE HERE>'}</h2>
                <p className="text-xl mb-8">Already know us?</p>
                <button
                  onClick={togglePage}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md p-8">
              <h1 className="text-4xl font-bold mb-6">Sign Up</h1>
              <div className="space-y-4 mb-4">
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-white hover:bg-gray-700 transition duration-150">
                  <img src="/google-logo.svg" alt="Google logo" className="w-6 h-6" />
                  <span>Sign up with Google</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-white hover:bg-gray-700 transition duration-150">
                  <img src="/apple-logo.svg" alt="Apple logo" className="w-6 h-6" />
                  <span>Sign up with Apple</span>
                </button>
              </div>
              <div className="my-4 border-t border-gray-700" />
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition duration-150">Sign Up</button>
              </form>
              <div className="mt-6 text-center">
                <p>Already know us?</p>
                <button onClick={togglePage} className="text-purple-500 hover:underline">Sign In</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}