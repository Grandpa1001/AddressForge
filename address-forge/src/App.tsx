import './App.css';

import { createClient } from '@remixproject/plugin-webview'
//import { PluginClient } from '@remixproject/plugin'

function App() {
  // @ts-ignore
  const client = createClient();
  

  const handleClick = async () => {
    console.log('Hello');
    getFile();
  };

  async function getFile() {
    try {
      const fileName = await client.call('fileManager', 'getCurrentFile');
      // Logika, gdy plik jest dostępny\
      console.log(fileName)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd:', error.message);
      } else {
        console.error('Wystąpił błąd', error);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
        Addres Forge
        </p>
        <button onClick={handleClick}>open sol</button>
      </header>
    </div>
  );
}

export default App;
