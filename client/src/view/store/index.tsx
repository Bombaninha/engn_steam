import React, { useEffect, useState } from 'react'
import LateralMenu from '../../components/lateral_menu'
import axios from 'axios'

const Store: React.FC = () => {
    interface ServerResponse {
        data: ServerData
        user: any
        loggedIn: boolean
      }
      
      interface ServerData {
        user: object
        email: string
        loggedIn: boolean
      }

    const [ emailRegister, setEmailRegister] = useState('');
    const [ passwordRegister, setPasswordRegister] = useState('');

    const [ emailLogin, setEmailLogin] = useState('');
    const [ passwordLogin, setPasswordLogin] = useState('');

    const [ loginStatus, setLoginStatus ] = useState("");

    axios.defaults.withCredentials = true;

    const register = () => {
        axios.post("http://localhost:3001/register", {
            email: emailRegister,
            password: passwordRegister,
        }).then((response) => {
            console.log(response);
        });
    }

    const login = () => {
        axios.post("http://localhost:3001/login", {
            email: emailLogin,
            password: passwordLogin,
        }).then((response) => {
            setLoginStatus('teste');
            /*
            if(response.data.message) {
                setLoginStatus(response.data.message);
            }
            */

            console.log(response);
            console.log(response.data);
        });
    }

    useEffect(() => {
        axios.get<ServerResponse>("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].email);
            } 
        });
    }, []);

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Email</label>
                <input type="text" onChange={(e) => { setEmailRegister(e.target.value) }}/>
                <label>Password</label>
                <input type="password" onChange={(e) => { setPasswordRegister(e.target.value) }}/>
                <button onClick={ register }>Register</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username..." onChange={(e) => { setEmailLogin(e.target.value) }}/>
                <input type="password" placeholder="Password..." onChange={(e) => { setPasswordLogin(e.target.value) }}/>
                <button onClick={ login }>Login</button>
            </div>
            <h1>{ loginStatus }</h1>
        </div>
    )
}

export default Store