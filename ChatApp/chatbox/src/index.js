// index.js or App.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/style.scss';
import App from './App'; // Import your main App component

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
