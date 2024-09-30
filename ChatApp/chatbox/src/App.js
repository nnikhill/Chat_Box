import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Auth/Home';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import Chat from './pages/Chat';
import ChatProvider from './context/ChatProvider';
import Register from './components/Auth/Register';
function App() {
  return (
    
     <ChatProvider>
       <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <ToastContainer />
      </div>
     </ChatProvider>
   
  );
}

export default App;
