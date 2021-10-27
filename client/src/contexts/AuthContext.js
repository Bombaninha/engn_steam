import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import HistoryService from '../services/history/HistoryService'

import Path from '../constant/Path';

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
        if(!authenticated) {
            const { data : { token, refreshToken, role } } = await axios.post('http://localhost:4000/v1/authenticate', {
                email: 'admin@gmail.com',
                password: 'pikachu$5'
            });
    
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user_id', JSON.stringify(refreshToken.user_id));
            localStorage.setItem('role', JSON.stringify(role));
    
            axios.defaults.headers.Authorization = `Bearer ${token}`;
    
            setAuthenticated(true);
            
            HistoryService.push(Path.MENU);
            console.log("Logado com sucesso!");
        } else {
            HistoryService.push(Path.MENU);
            console.log("Usuário já está logado!");
        }
    }

    function handleLogout() {
        if(authenticated) {
            setAuthenticated(false); 
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('role');
            axios.defaults.headers.Authorization = undefined;
            console.log("Deslogado com sucesso!");
        } else {
            console.log("Usuário não está logado!");
        }
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