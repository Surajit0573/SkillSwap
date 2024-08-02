import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </AppContextProvider>
)
