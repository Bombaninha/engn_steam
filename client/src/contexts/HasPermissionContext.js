import { createContext, useState, useEffect, useContext } from 'react';
//import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Context } from './AuthContext'

const PermissionContext = createContext();

function HasPermissionProvider({ children }) {
    const [hasPermission, setHasPermission] = useState(0);
    const [loading, setLoading] = useState(true);
    const { authenticated } = useContext(Context);

    useEffect(() => {
        if (authenticated) {
            console.log("Autenticado");
        }
        setLoading(false);
    }, [authenticated]);

    async function handleHasPermission() {
        const { data } = await axios.post('http://localhost:4000/v1/users/view', {
            user_id: 'a524f1b9-1646-4c7d-9250-48e753f72497'
        });

        //axios.defaults.headers.Authorization = `Bearer ${token}`;
        let valor = 0;
        if (data.role.label === 'admin') {
            valor = 3
        }
        localStorage.setItem('role_enum', JSON.stringify(valor));

        setHasPermission(valor);
        //history.push('/');
        //console.log(history);
        console.log("Logado com sucesso!");
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <PermissionContext.Provider value={{ hasPermission, handleHasPermission }}>
            {children}
        </PermissionContext.Provider>
    );
}

export { PermissionContext, HasPermissionProvider }