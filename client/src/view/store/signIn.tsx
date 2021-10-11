import React, { useEffect, useState, FormEvent } from 'react'
import LateralMenu from '../../components/lateral_menu'
import axios from 'axios'

const Store: React.FC = () => {
    const [ nameRegister, setNameRegister] = useState('');
    const [ emailRegister, setEmailRegister] = useState('');
    const [ passwordRegister, setPasswordRegister] = useState('');
    const [ isDevRegister, setIsDevRegister ] = useState(false);
    
    const register = () => {
        if(nameRegister.trim() === '' || emailRegister.trim() === '' || passwordRegister.trim() === '') {
            return;
        }

        axios.post("http://localhost:3001/register", {
            name: nameRegister,    
            email: emailRegister,
            password: passwordRegister,
            isDev: isDevRegister
        }).then((response) => {
            setNameRegister('');
            setEmailRegister('');
            setPasswordRegister('');
            setIsDevRegister(false);
            console.log(response);
        });
    }

    return (
        <div>
            Name: <input type="text" onChange={(e) => { setNameRegister(e.target.value) }}/>
            Email: <input type="text" onChange={(e) => { setEmailRegister(e.target.value) }}/>
            Password: <input type="password" onChange={(e) => { setPasswordRegister(e.target.value) }}/>
            <input type="checkbox" 
                onChange={ event => setIsDevRegister(event.target.checked) }
                checked={ isDevRegister }
            /> Você é desenvolvedor?
        <button onClick={ register }>Register</button>
        </div>
    );
}

export default Store