/*
import React, { createContext, useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../contexts/AuthContext'

const PermissionContext = createContext();

function HasPermissionProvider({ children }) {
    const [ hasPermission, setHasPermission ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`; 
        }

        setLoading(false);
    }, []);


    async function handleHasPermission() {
        const { data : { token } } = await axios.post('http://localhost:4000/v1/authenticate', {
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

    if(loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <PermissionContext.Provider value={{ hasPermission, handleHasPermission }}>
            { children }
        </PermissionContext.Provider>
    );
}

export { PermissionContext, HasPermissionProvider }
*/