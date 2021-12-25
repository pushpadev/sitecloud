import React, { useState } from 'react';

const CurrentSiteContext = React.createContext([{}, () => {}]);

const CurrentSiteProvider = (props) => {
  const [currentSite, setCurrentSite] = useState({});
  return (
    <CurrentSiteContext.Provider value={[currentSite, setCurrentSite]}>
      {props.children}
    </CurrentSiteContext.Provider>
  );
};

export {CurrentSiteContext, CurrentSiteProvider};