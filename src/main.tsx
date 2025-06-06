import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import './i18n/config'
import { ThemeProvider } from './contexts/ThemeContext'
import { InitialLoadingLayout } from './components/layout/InitialLoadingLayout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Suspense fallback={<InitialLoadingLayout />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>,
)
