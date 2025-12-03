import React from 'react'
import { createRoot } from 'react-dom/client'
import DeepDiveBriefing from './DeepDiveBriefing'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeepDiveBriefing />
  </React.StrictMode>
)
