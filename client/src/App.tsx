import React from 'react';
//import { database, ref, set } from './services/firebase';
import Main from './view';
import './styles.css'

import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  )
}
export default App
