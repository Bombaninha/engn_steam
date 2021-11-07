import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import HistoryService from '../services/history/HistoryService'
import { toast } from 'react-toastify';
import api, { toastConfig } from '../api';

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Setando dados por padrão para ajudar no debug
    const [userEmail, setUserEmail] = useState('admin@gmail.com');
    const [userPassword, setUserPassword] = useState('pikachu$5');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(event) {
        event.preventDefault();

        try {
            if (!authenticated) {
                const { data: { token, refreshToken } } = await api.post('/authenticate', {
                    email: userEmail,
                    password: userPassword
                });

                //setUserEmail('');
                //setUserPassword('');

                localStorage.setItem('token', JSON.stringify(token));

                const userId = refreshToken.user_id;

                const { data } = await api.get(`/users/${userId}`);

                localStorage.setItem('user', JSON.stringify(data));
                api.defaults.headers.Authorization = `Bearer ${token}`;

                setAuthenticated(true);
                toast.success('Login realizado com sucesso!', toastConfig);
            } else {
                HistoryService.push('/');
                const warnMsg = "Usuário já está logado!"
                console.log(warnMsg);
                toast.warn(warnMsg, toastConfig);
            }
        } catch (error) {
            const errorMsg = error.response.data.error;
            console.error(errorMsg)
            toast.error(errorMsg, toastConfig);
        }
    }

    function handleLogout() {
        if (authenticated) {
            setAuthenticated(false);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            api.defaults.headers.Authorization = undefined;
            const msg = "Deslogado com sucesso!";
            console.log(msg);
            toast.success(msg, toastConfig);
            HistoryService.push('/');
        } else {
            const warnMsg = "Usuário não está logado!";
            console.warn(warnMsg);
            toast.warn(warnMsg, toastConfig);
        }
    }

    return (
        <Context.Provider value={{ userEmail, setUserEmail, userPassword, setUserPassword, loading, authenticated, handleLogin, handleLogout }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider }