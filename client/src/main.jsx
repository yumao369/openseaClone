import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NFTMarketplaceProvider } from '../context/NFTMarketplaceContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NFTMarketplaceProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NFTMarketplaceProvider>
)
