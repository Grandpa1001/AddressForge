import './styles/App.css';
import React, { useState } from 'react';


import { createClient } from '@remixproject/plugin-webview'

function App() {
  // @ts-ignore
  const client = createClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [chainId, setChainId] = useState('');
  const [acc, setAcc] = useState('');

  //Buttons
  const getNetworkClick = async () => {
    setErrorMessage(''); 
    getNetwork();
    getAccount();
  };


  //function
  async function getNetwork() {
    try {
      const network = await client.call('network', 'detectNetwork');
      setChainId(network.id);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd:', error.message);
        setErrorMessage(error.message);
      } else {
        console.error('Wystąpił błąd', error);
        setErrorMessage('Wystąpił nieoczekiwany błąd');
      }
    }
  }

  async function getAccount() {
    try {
      const accounts = await client.udapp.getAccounts()
      console.log(accounts)
      setAcc(accounts)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd:', error.message);
        setErrorMessage(error.message);
      } else {
        console.error('Wystąpił błąd', error);
        setErrorMessage('Wystąpił nieoczekiwany błąd');
      }
    }
  }

  //RETURN
  return (
    <div className="App">
      <header className="App-header">
        <div className="Button-container">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="label-value"> <b>Chain id:</b></div>
        <div className="label-value">{chainId}</div>
        <div className="label-value"><b>Account:</b></div>
        <div className="label-value">{acc}</div>
        <button onClick={getNetworkClick}>getData</button>
        </div>
      </header>
    </div>
  );
}



export default App;
