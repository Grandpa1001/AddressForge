import './App.css';
import React, { useState } from 'react';
import Header from './Header';

import { createClient } from '@remixproject/plugin-webview'
//import { PluginClient } from '@remixproject/plugin'

function App() {
  // @ts-ignore
  const client = createClient();
  const [errorMessage, setErrorMessage] = useState('');

  //Buttons
  const getNameSol = async () => {
    setErrorMessage(''); 
    getFile();
  };

  const getNetworkClick = async () => {
    setErrorMessage(''); 
    getNetwork();
  };

  const gotoDapp = async () => {
    console.log("goto dapp")
  };

  //function
  async function getFile() {
    try {
      const fileName = await client.call('fileManager', 'getCurrentFile');
      console.log(fileName)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd:', error.message);
        setErrorMessage(error.message); // Set error message
      } else {
        console.error('Wystąpił błąd', error);
        setErrorMessage('Wystąpił nieoczekiwany błąd'); // Set generic error message
      }
    }
  }

  async function getNetwork() {
    try {
      const network = await client.network.detectNetwork()
      console.log(network)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd:', error.message);
        setErrorMessage(error.message); // Set error message
      } else {
        console.error('Wystąpił błąd', error);
        setErrorMessage('Wystąpił nieoczekiwany błąd'); // Set generic error message
      }
    }
  }

  //RETURN
  return (
    <>
    <Header />
    <div className="App">
      <header className="App-header">
        <div className="Button-container">
        <button onClick={getNameSol}>getName sol</button>
        <button onClick={getNetworkClick}>getChain</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </header>
    </div>
    </>
  );
}

export default App;
