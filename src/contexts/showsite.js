import React, { useState } from 'react';

const ShowSiteContext = React.createContext([{}, () => {}]);

const ShowSiteProvider = (props) => {
  const [siteId, setSiteId] = useState(null);
  return (
    <ShowSiteContext.Provider value={[siteId, setSiteId]}>
      {props.children}
    </ShowSiteContext.Provider>
  );
};

export {ShowSiteContext, ShowSiteProvider};