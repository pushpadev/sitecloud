import PrimarySearchAppBar from './components/appbar';
import React from 'react';
import Routers from './router';
import { SitesProvider } from './contexts/sites';
import { CurrentSiteProvider } from './contexts/currentsite';
import { ToastProvider } from 'react-toast-notifications';
import { ShowSiteProvider } from './contexts/showsite';
import './App.css';

function App() {
  return (
    <div className='App'>
      <ToastProvider>
        <ShowSiteProvider>
          <SitesProvider>
            <CurrentSiteProvider>
              {/* <PrimarySearchAppBar /> */}
              <Routers />
            </CurrentSiteProvider>
          </SitesProvider>
        </ShowSiteProvider>
      </ToastProvider>
    </div>
    
  );
}

export default App;
