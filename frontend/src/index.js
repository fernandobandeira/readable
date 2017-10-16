import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = '123';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
