import { createContext, ReactNode, useEffect, useState } from "react";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

type User = {
    id: string;
    name: string | null;
}

type AuthContextType = {
    user: User | undefined;
    signInWithEmailAndPasswordContext: () => Promise<void>;
  }

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {

        if(user) {
          const { uid, email, displayName } = user;
  
          if(!email) {
            throw new Error('Missing information.');
          }
  
          setUser({
            id: uid,
            name: email
          });        
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, []);

    async function signInWithEmailAndPasswordContext() {
        const email = 'lucasspagnolobombana@gmail.com';
        const password = 'pikachu$5';
        console.log(email);
        const auth = getAuth();

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;

            setUser({
                id: user.uid,
                name: 'ué'
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    
          //if(result.user) {
          //  const { displayName, photoURL, uid } = result.user;
    
           // if(!displayName || !photoURL) {
           //   throw new Error('Missing information from Google Account.');
           // }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithEmailAndPasswordContext }}>
            { props.children }
        </AuthContext.Provider>
    );
};