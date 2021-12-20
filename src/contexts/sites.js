import React, { useState } from 'react';
// import { SITE_LIST } from '../constant';

const SitesContext = React.createContext([{}, () => {}]);

const SitesProvider = (props) => {
  const [sites, setSites] = useState([]);
  return (
    <SitesContext.Provider value={[sites, setSites]}>
      {props.children}
    </SitesContext.Provider>
  );
};

export {SitesContext, SitesProvider};