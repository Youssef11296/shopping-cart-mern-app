// modules
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import MainLayout from './layouts/MainLayout'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout>
        <App />
      </MainLayout>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
