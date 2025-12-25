import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Nb from './NvB.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nb>  <App /></Nb>
    
    
  </StrictMode>
);
