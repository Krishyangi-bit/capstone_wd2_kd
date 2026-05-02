import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import App from './App.jsx'
import { initializeDummyData } from './utils/dummyData'

// Initialize dummy data on app load
initializeDummyData()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
