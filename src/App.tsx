//import { useHistory } from 'react-router-dom';
import React from 'react';
//import logo from './logo.svg';
import { getDatabase, database, ref, set, onValue } from './services/firebase';

import GlobalStyles from './styles/GlobalStyles';

import { push, get, child } from 'firebase/database';

import { ThemeProvider } from 'styled-components';
//import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

import standard from './styles/themes/standard';

import { AuthContextProvider } from './contexts/AuthContext';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import { on } from 'stream';


const App: React.FC = () => {
  /*
  const db = getDatabase();
  const roomRef = ref(db, 'users');
  
  push(roomRef, {
    name: 'lucas'
  });
  */

  /*
  const usersRef = ref(database, 'users');
  onValue(usersRef, (user: any) => {
    console.log(user.val());
    //const data = snapshot.val();
    //console.log(data);
  });
  */

  /*
 const db = getDatabase();
 const gameRef = ref(db, 'games');
 
  push(gameRef, {
    name: 'Jogo 1'
  });

  push(gameRef, {
    name: 'Jogo 2'
  });

  push(gameRef, {
    name: 'Jogo 3'
  });

  push(gameRef, {
    name: 'Jogo 4'
  }); */ 
  
  const dbRef = ref(getDatabase());

  get(child(dbRef, `games`)).then((snapshot : any) => { 
    if (snapshot.exists()) {
      snapshot.forEach(function(childSnapshot: any) {
        var childData = childSnapshot.val();
        console.log(childData)
      });
    } else {
      console.log("No data available");
    }
  }).catch((error : any) => {
    console.error(error);
  });

  return (
    <AuthContextProvider>
      <ThemeProvider theme={standard}>
        <GlobalStyles />
        <Layout />
      </ThemeProvider>
    </AuthContextProvider>
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
