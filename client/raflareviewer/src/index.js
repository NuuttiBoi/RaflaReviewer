import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/Map/mapStyle.css';
import App from './App';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Map from './components/Map/Map';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
      </BrowserRouter>
      </React.StrictMode>
);
