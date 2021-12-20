import PrimarySearchAppBar from './components/appbar';
import React from 'react';
import Routers from './router';
import { SitesProvider } from './contexts/sites';
import { CurrentSiteProvider } from './contexts/currentsite';
import './App.css';

function App() {
  return (
    <div className='App'>
        <SitesProvider>
          <CurrentSiteProvider>
            <PrimarySearchAppBar />
            <Routers />
          </CurrentSiteProvider>
        </SitesProvider>
    </div>
    
  );
}

export default App;
