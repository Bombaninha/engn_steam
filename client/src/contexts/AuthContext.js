import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import HistoryService from '../services/history/HistoryService'

import Path from '../constant/Path';
import { API_URL } from '../constant/api';

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    //const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(username, password) {
        if (!authenticated) {
            try {
                const res = await axios.post(API_URL + '/v1/authenticate', {
                    email: username, // 'adminobrabo@gmail.com'
                    password: password, // 'pikachu$5'
                });
                console.log(res);
                const { token, refreshToken, role } = res.data;

                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('user_id', JSON.stringify(refreshToken.user_id));
                localStorage.setItem('role', JSON.stringify(role));

                axios.defaults.headers.Authorization = `Bearer ${token}`;

                setAuthenticated(true);

                HistoryService.push(Path.MENU);
                console.log("Logado com sucesso!");
            } catch (err) {
                const status = err.response.status;
                const errorMsg = err.response.data.error;
                alert("Erro " + status + "\n" + errorMsg);
            };
        } else {
            HistoryService.push(Path.MENU);
            console.log("Usuário já está logado!");
        }
    }

    function handleLogout() {
        if (authenticated) {
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

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider }