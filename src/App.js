import PrimarySearchAppBar from './components/appbar';
import React from 'react';
import Routers from './router';
import { SitesProvider } from './contexts/sites';
import { CurrentSiteProvider } from './contexts/currentsite';
import { ToastProvider } from 'react-toast-notifications'
import './App.css';

function App() {
  return (
    <div className='App'>
      <ToastProvider>
        <SitesProvider>
          <CurrentSiteProvider>
            <PrimarySearchAppBar />
            <Routers />
          </CurrentSiteProvider>
        </SitesProvider>
      </ToastProvider>
    </div>
    
  );
}

export default App;
