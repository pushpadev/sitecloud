import React from 'react';
import Routers from './router';
import { SitesProvider } from './contexts/sites';
import { CurrentSiteProvider } from './contexts/currentsite';
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

function App() {


  return (
    <div className='App'>
      <SitesProvider>
        <CurrentSiteProvider>
          <Routers />
        </CurrentSiteProvider>
      </SitesProvider>
    </div>

  );
}

export default App;
