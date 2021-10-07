//import { useHistory } from 'react-router-dom';
import React from 'react';
//import logo from './logo.svg';
//import { database, ref, set } from './services/firebase';

import GlobalStyles from './styles/GlobalStyles';

import { ThemeProvider } from 'styled-components';
//import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

import standard from './styles/themes/standard';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={standard}>
      <GlobalStyles />
      <Layout />
    </ThemeProvider>
  );
}

//function App() {
  //const history = useHistory();
  //const roomRef = ref(database, 'rooms');

  //async function teste() {
  //  const firebaseRoom = await set(ref(database, 'users'), {
  //    title: 'tapejara'
  //  });
  //  console.log(firebaseRoom);
  //}

  //teste();
  // teste
//}

export default App;
