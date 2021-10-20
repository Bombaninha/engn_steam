import React, { createContext, useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Context = createContext();

function AuthProvider({ children }) {
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    //const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`; 
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin() {
        const { data : { token } } = await axios.post('http://localhost:4000/authenticate', {
            email: 'admin@gmail.com',
            password: 'pikachu$5'
        });

        localStorage.setItem('token', JSON.stringify(token));

        axios.defaults.headers.Authorization = `Bearer ${token}`;

        setAuthenticated(true);
        //history.push('/');
        //console.log(history);
        console.log("Logado com sucesso!");
    }

    function handleLogout() {
        setAuthenticated(false); 
        localStorage.removeItem('token');
        axios.defaults.headers.Authorization = undefined;
        console.log("Deslogado com sucesso!");
        // redirect para outra page
    }

    if(loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
            { children }
        </Context.Provider>
    );
}

export { Context, AuthProvider }