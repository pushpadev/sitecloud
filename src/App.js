import PrimarySearchAppBar from './components/appbar';
import React from 'react';
import Routers from './router';
import { SitesProvider } from './contexts/sites';
import { CurrentSiteProvider } from './contexts/currentsite';
import { ToastProvider } from 'react-toast-notifications';
import { ShowSiteProvider } from './contexts/showsite';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function App() {
  return (
    <div className='full_container'>
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
