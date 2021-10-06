//import { useHistory } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import './App.css';

import { database, ref, set } from './services/firebase';

function App() {
  //const history = useHistory();
  //const roomRef = ref(database, 'rooms');

  async function teste() {
    const firebaseRoom = await set(ref(database, 'users'), {
      title: 'tapejara'
    });
    console.log(firebaseRoom);
  }
  console.log("eh pra vir")
  teste();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
