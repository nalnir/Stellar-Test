import React, { useEffect, useState } from 'react';

// Views
import Landing from './views/landing/landing';
import Account from './views/account/account';

const App = () => {

  const [keyPair, setKeyPair] = useState(null);

  useEffect(()=> {
    const pair = loadKeyPairFromLocalStorage();
    setKeyPair(pair);
  },[])

  const loadKeyPairFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('stellar_test_account_encrypted'));
  }

  if(keyPair) {
    return <Landing></Landing>
  } else {
    return <Account></Account>
  }

}

export default App;
