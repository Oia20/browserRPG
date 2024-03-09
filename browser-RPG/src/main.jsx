import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MyLogo from './components/logo.jsx'
import './index.css'
import Box from "./components/box.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyLogo />
    <Box />
  </React.StrictMode>,
)
