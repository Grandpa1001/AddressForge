import './styles/App.css';
import React, { useState } from 'react';

import { createClient } from '@remixproject/plugin-webview'

function App() {
  // @ts-ignore
  const client = createClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [chainId, setChainId] = useState('');
  const [acc, setAcc] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);

  const ethereumAddressRegex = /^0x[a-fA-F0-9]+$/;

  //Buttons
  const getNetworkClick = async () => {
    setErrorMessage(''); 
    getNetwork();
    getAccount();
  };

  //Inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Assuming your prefix "0x" is already included and the user types the remaining part
    const fullAddress = `0x${value}`;
    const isValid = ethereumAddressRegex.test(fullAddress);
    setIsValidAddress(isValid);
    if(value ===''){
      setIsValidAddress(true);
    }
    setInputValue(value);
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
        <div className="App-container">
        <label htmlFor="forgedAddress" className="input-label">Forged Address</label>
        <div className="input-group">
        <span className="input-prefix">{inputValue ? `0x` : '0x...'} </span>
        <input 
          type="text"
          placeholder="Enter your desired address"
          value={inputValue}
          onChange={handleInputChange}
          className="forged-input"
          maxLength={20} 
        />
      </div>
      {!isValidAddress && <div className="error-validate">Please enter a valid Ethereum address.</div>}
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
