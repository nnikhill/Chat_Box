import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.jpg';
import { motion } from 'framer-motion';
import { RxPerson, RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { FiMail, FiLock } from "react-icons/fi";
import { registerRoute } from "../../utils/APIRoutes";
import { toastOptions } from "../../utils/constants";
import axios from "axios";



function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [isActive, setIsActive] = useState('not-active');
  const navigate = useNavigate();

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same.");
      return false;
    } else if (username.length < 3) {
      toast.error("Name should be greater than 3 characters.");
      return false;
    } else if (password.length < 4) {
      toast.error("Password should be greater than 4 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }
    return true;
  };
  
  // const handleValidation = () => {
  //   const { password, confirm_Password, username, email } = values;
  //   if (password !== confirm_Password) {
  //     toast.error( "Password and confirm password should be same.");
  //     return false;
  //   } 
  //   else if (username.length < 3) {
  //     toast.error("Username should be greater than 3 characters.",toastOptions);
  //     return false;
  //   } 
  //   else if (password.length < 6) {
  //     toast.error("Password should be greater than 6 characters.", toastOptions);
  //     return false;
  //   } 
  //   else if (email === "") {
  //     toast.error("Email is required.", toastOptions);
  //     return false;
  //   }
  //   return true;
  // };


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { username, email, password, profilePic } = values;
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        if (profilePic) {
          formData.append("profilePic", profilePic, profilePic.name);
        };
        const { data } = await axios.post(registerRoute, formData);
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/login");
        }
      } catch (error) {
        toast.error(error.response.data.msg, toastOptions);
      };
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
              <a className="rounded-md bg-rose-500 px-3 py-1.5 font-dm text-sm font-medium text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]" href="/">
                Go to Back
              </a>
            </div>
          </nav>
        </header>
        <div className="flex">
          <div className="w-1/2 p-5">
            <img src="https://img.freepik.com/free-vector/credit-score-flat-composition-with-chat-bubbles-envelopes-application-screens-black-woman-with-credit-card-vector-illustration_1284-83826.jpg" alt="Signup Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className="bg-grey-lighter min-h-screen flex flex-col w-1/2 p-3">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="text-center font-bold text-3xl">Signup Here</div>
              <br />
              <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                  />
                  <RxPerson className="absolute top-3 right-3" />
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    placeholder="Email"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                  />
                  <FiMail className="absolute top-3 right-3" />
                </div>
                <div className="input-field">
                  <input
                 type={`${show ? "text" : "password"}`}
                 placeholder="Password"
                 name="password"
                 onChange={(e) => handleChange(e)}
                    className="block border border-grey-light w-full p-3 rounded mb-4"
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
                <div className="input-field">
                  <input
                     type={`${showConfirm ? "text" : "password"}`}
                     placeholder="Confirm Password"
                     name="confirmPassword"
                     onChange={(e) => handleChange(e)}
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                  />
                  <FiLock className="absolute top-3 right-3" />
                    {show ? (
                      <RxEyeOpen
                        className="absolute top-3 right-10 cursor-pointer"
                        onClick={() => { setShowConfirm(false) }}
                      />
                    ) : (
                      <RxEyeClosed
                        className="absolute top-3 right-10 cursor-pointer"
                        onClick={() => { setShowConfirm(true) }}
                      />
                    )}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-center py-3 rounded bg-rose-500 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Create Account
                </button>
              </div>
              <div className="text-grey-dark mt-6">
                Already have an account?{' '}
                <Link to="/login">
                  <span className="no-underline border-b border-blue text-blue">Log in</span>
                </Link>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
