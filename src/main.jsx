// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "@fontsource/inter";
import "@fontsource/space-grotesk";
import AuthProvider from './components/Global/AuthProvider.jsx'
// import Lenis from 'lenis'
// import 'lenis/dist/lenis.css'

// const Lenis = new Lenis({
//     autoRaf: true,
//   });

createRoot(document.getElementById('root')).render(
<StrictMode>
     <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
      </BrowserRouter>
</StrictMode>

)
