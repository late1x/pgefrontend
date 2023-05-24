import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import "bulma/css/bulma.css";
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
