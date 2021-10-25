import React from 'react';
//import { database, ref, set } from './services/firebase';
import Main from './view';
import './styles.css'

import { AuthProvider } from './contexts/AuthContext';

import { HasPermissionProvider } from './contexts/HasPermissionContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HasPermissionProvider>
        <Main />
      </HasPermissionProvider>
    </AuthProvider>
  )
}
export default App
