import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainApp from './usecontext/MainApp';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >

  <MainApp />

  </BrowserRouter>
)