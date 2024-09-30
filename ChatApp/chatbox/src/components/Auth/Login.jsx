import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RxPerson, RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { FiLock } from "react-icons/fi";
import { motion } from 'framer-motion';
import axios from 'axios';
import logo from '../../assets/logo.jpg';
import { loginRoute } from '../../utils/APIRoutes';
import { toastOptions } from '../../utils/constants';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password } = loginData;
    if (username === "" || password === "") {
      toast.error("Username or Password is incorrect", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { username, password } = loginData;
        const { data } = await axios.post(loginRoute, { username, password });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data));
          toast.success('Logged in successfully!');
          navigate('/chat');
        }
      } catch (err) {
        toast.error(err?.response?.data?.msg || 'An error occurred during login.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
          <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
            <div className="relative flex items-center">
              <a href="/">
                <img className="block h-8 w-auto" height="32" src={logo} alt="Logo" />
              </a>
            </div>
            <div className="flex-grow"></div>
            <div className="hidden items-center justify-center gap-6 md:flex">
              <a className="rounded-md bg-rose-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md hover:scale-[1.03]" href="/">
                Go to Back
              </a>
            </div>
          </nav>
        </header>

        <div className="flex">
          <div className='w-1/2 p-5 mt-5'>
            <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7862.jpg" alt="Login illustration" className="w-full h-auto" />
          </div>

          <div className="w-1/2 p-1 flex justify-center items-center">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full max-w-sm">
              <h2 className="text-3xl font-bold text-center mb-6">Login Here</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      className="block border border-grey-light w-full p-3 rounded"
                      required
                    />
                    <RxPerson className="absolute top-3 right-3" />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <input
                      type={`${show ? "text" : "password"}`}
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="block border border-grey-light w-full p-3 rounded"
                      required
                    />
                    <FiLock className="absolute top-3 right-3" />
                    {show ? (
                      <RxEyeOpen
                        className="absolute top-3 right-10 cursor-pointer"
                        onClick={() => setShow(false)}
                      />
                    ) : (
                      <RxEyeClosed
                        className="absolute top-3 right-10 cursor-pointer"
                        onClick={() => setShow(true)}
                      />
                    )}
                  </div>
                </div>

                <button type="submit" className="w-full py-3 rounded bg-rose-500 text-white hover:bg-rose-600 focus:outline-none my-1">
                  Log in
                </button>
              </form>

              <div className="text-grey-dark mt-6 text-center">
                Don't have an account?
                <a href="/register" className="text-blue-500 underline ml-1">
                  Sign up
                </a>.
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Login;
