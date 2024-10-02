import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPages() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const pageVariants = {
    initial: { opacity: 0, x: '-100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '100%' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoginPage ? (
          <motion.div
            key="login"
            className="flex flex-col lg:flex-row w-full"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
              <div className="w-full max-w-md">
                <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Sign In</h1>
                <div className="space-y-4 mb-4">
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base text-black bg-white hover:bg-gray-200 transition duration-150">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base text-black bg-white hover:bg-gray-200 transition duration-150">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#000000"/>
                    </svg>
                    <span>Sign in with Apple</span>
                  </button>
                </div>
                <div className="my-4 border-t border-gray-700" />
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-gray-800 rounded-md text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-gray-800 rounded-md text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <div className="text-xs lg:text-sm text-right">
                    <a href="#" className="text-purple-500 hover:underline">FORGOT YOUR PASSWORD?</a>
                  </div>
                  <button className="w-full bg-white text-black py-2 rounded-md text-sm lg:text-base hover:bg-gray-200 transition duration-150">Sign In</button>
                </form>
              </div>
            </div>
            <div className="hidden lg:flex lg:w-1/2 bg-purple-600 rounded-l-[50px] items-center justify-center p-12">
              <div className="text-white text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Welcome Back!</h2>
                <button
                  onClick={togglePage}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-md text-sm lg:text-base hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            className="flex flex-col lg:flex-row w-full"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="hidden lg:flex lg:w-1/2 bg-purple-600 rounded-r-[50px] items-center justify-center p-12">
              <div className="text-white text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Join Us!</h2>
                <p className="text-lg lg:text-xl mb-8">Already know us?</p>
                <button
                  onClick={togglePage}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-md text-sm lg:text-base hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
              <div className="w-full max-w-md">
                <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Sign Up</h1>
                <div className="space-y-4 mb-4">
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base text-black bg-white hover:bg-gray-200 transition duration-150">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                      </g>
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base text-black bg-white hover:bg-gray-200 transition duration-150">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#000000"/>
                    </svg>
                    <span>Sign up with Apple</span>
                  </button>
                </div>
                <div className="my-4 border-t border-gray-700" />
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-gray-800 rounded-md text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-gray-800 rounded-md text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button className="w-full bg-white text-black py-2 rounded-md text-sm lg:text-base hover:bg-gray-200 transition duration-150 mt-4">Sign Up</button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}