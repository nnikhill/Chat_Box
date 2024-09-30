import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';  // Correct logo import
import chatlogo from '../../assets/chatbox logo.jpg';  // Correct logo import

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation when component is mounted
      exit={{ opacity: 0, y: -50 }} // Animation when component is unmounted
      transition={{ duration: 0.5 }} // Animation duration
    >
       <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
                <div className="relative flex items-center">
                    <a href="/">
                    <img className="block h-8 w-auto" height="32" src={logo} alt="Logo" /> {/* Updated logo import */}
                    </a>
                </div>
               
                <div className="flex-grow"></div>
                <div className="hidden items-center justify-center gap-6 md:flex">
                    <a className="font-dm text-sm font-medium text-slate-700" href='/login' ><Link to="/login">Login</Link></a>
                    <a
                        className="rounded-md bg-rose-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md shadow-black-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]" href="/register">
                        Sign up
                    </a>
                </div>
                <div className="relative flex items-center justify-center md:hidden">
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="h-6 w-auto text-slate-900">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8 relative">
  {/* Add your content here */}
</div>
<div className="max-w-7xl mx-auto relative">
  <div className="relative py-12 flex flex-col items-center px-4 sm:px-0">
    
    <div className="flex justify-center w-full">
      <img className="h-56 w-auto" src={chatlogo} alt="Logo" /> {/* Centered logo */}
    </div>
    <div className="pb-4">
      <span className="inline-flex items-center rounded-2xl bg-rose-300 px-4 py-1.5 text-xs sm:text-sm font-serif font-medium text-black"> 
        Connecting Conversations, Anytime, Anywhere.
      </span>
    </div>
    <p className="mt-4 text-lg sm:text-xl leading-8 text-gray-800 sm:px-28 text-center">
      Transforming the Way You Communicate – From Casual Chats to Deep Conversations, Experience Connection Like Never Before, Anytime, Anywhere. Where Every Connection Strengthens the Ties That Bind Us Together.
    </p>
    <div className="mt-8 flex w-full space-x-8 justify-center">
      <a href="/login">
        {/* Add your login button here */}
      </a>
    </div>
  </div>
</div>

     
    </motion.div>
  );
};

export default Home;
