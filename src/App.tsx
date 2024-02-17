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
  const [addressCreationPurpose, setAddressCreationPurpose] = useState('');
  const [editablePart, setEditablePart] = useState('');
  const [gasReductionLevel, setGasReductionLevel] = useState(1);

  const ethereumAddressRegex = /^0x[a-fA-F0-9]+$/;

  //Buttons
  const getNetworkClick = async () => {
    setErrorMessage(''); 
    getNetwork();
    getAccount();
  };

  const increment = () => {
    setGasReductionLevel((prev) => (prev < 20 ? prev + 1 : prev));
  };
  
  const decrement = () => {
    setGasReductionLevel((prev) => (prev > 0 ? prev - 1 : prev));
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
      setAcc(accounts[0])
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
        <div className="radio-group">
        <label htmlFor="purpose" className="input-label">Choose address creation purpose:</label>
        <label>
          <input
            type="radio"
            value="Editable address"
            name="addressCreationPurpose"
            checked={addressCreationPurpose === 'Editable address'}
            onChange={(e) => setAddressCreationPurpose(e.target.value)}
          />
        <div className="radio-value">Editable address</div>
        </label>
        <label>
          <input
            type="radio"
            value="Gas reduction"
            name="addressCreationPurpose"
            checked={addressCreationPurpose === 'Gas reduction'}
            onChange={(e) => setAddressCreationPurpose(e.target.value)}
          />
          <div className="radio-value">Gas reduction</div>
        </label>
      </div>

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
      {!isValidAddress && <div className="error-validate">Use only the appropriate characters.</div>}

      <div className="radio-group">
      <label htmlFor="editablePart" className="input-label">Choose the editable part of address:</label>
      <label>
        <input
          type="radio"
          value="prefix"
          name="editablePart"
          checked={editablePart === 'prefix'}
          onChange={(e) => setEditablePart(e.target.value)}
        />
        <span className="radio-value">Prefix</span>
      </label>
      <label>
        <input
          type="radio"
          value="suffix"
          name="editablePart"
          checked={editablePart === 'suffix'}
          onChange={(e) => setEditablePart(e.target.value)}
        />
        <span className="radio-value">Suffix</span>
      </label>
    </div>

    <label htmlFor="gasReduction" className="input-label">Choose level of gas reduction</label>
      <div className="gas-reduction">
        <button className="gas-reduction-btn" onClick={decrement}>-</button>
        <input
          type="text"
          value={gasReductionLevel}
          readOnly
          className="gas-reduction-input"
        />
        <button className="gas-reduction-btn" onClick={increment}>+</button>
      </div>

    <div className="value-group">
      <label htmlFor="account" className="input-label">Deployer wallet</label>
      <div className="label-value">{acc}</div>  

    </div>
    <button onClick={getNetworkClick}>referesh</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="label-value"> <b>Chain id:</b></div>
        <div className="label-value">{chainId}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
