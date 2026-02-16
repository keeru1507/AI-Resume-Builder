import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ArtifactProvider } from './store/ArtifactStore'
import { ResumeProvider } from './store/ResumeStore'
import { TemplateProvider } from './store/TemplateStore'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ArtifactProvider>
        <ResumeProvider>
          <TemplateProvider>
            <App />
          </TemplateProvider>
        </ResumeProvider>
      </ArtifactProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
