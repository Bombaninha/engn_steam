import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import HistoryService from '../services/history/HistoryService'

import Path from '../constant/Path';

import api from "../api";

const Context = createContext();

function AuthProvider({ children }) {
    const [ user, setUser ] = useState({});
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    // Setando dados por padrão para ajudar no debug
    const [ userEmail, setUserEmail ] = useState('admin@gmail.com');
    const [ userPassword, setUserPassword ] = useState('pikachu$5');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`; 
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(event) {
        event.preventDefault();

        try {
            if(!authenticated) {
                const { data : { token, refreshToken } } = await api.post('/authenticate', {
                    email: userEmail,
                    password: userPassword
                });

                localStorage.setItem('token', JSON.stringify(token));

                const userId = refreshToken.user_id;

                const { data } = await api.get(`/users/${userId}`);

                api.defaults.headers.Authorization = `Bearer ${token}`;
        
                setAuthenticated(true);
                setUser(data);
                HistoryService.push(Path.MENU);
                console.log("Logado com sucesso!");
            } else {
                HistoryService.push(Path.MENU);
                console.log("Usuário já está logado!");
            }
        } catch(error) {
            console.log(error.response.data.error)
        }
    }

    function handleLogout() {
        if(authenticated) {
            setAuthenticated(false); 
            setUser({});
            localStorage.removeItem('token');
            api.defaults.headers.Authorization = undefined;
            console.log("Deslogado com sucesso!");
            HistoryService.push('/');
        } else {
            console.log("Usuário não está logado!");
        }
    }

    return (
        <Context.Provider value={{ userEmail, setUserEmail, userPassword, setUserPassword, loading, user, authenticated, handleLogin, handleLogout }}>
            { children }
        </Context.Provider>
    );
}

export { Context, AuthProvider }