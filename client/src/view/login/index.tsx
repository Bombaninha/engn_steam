import React, { useContext, useState } from 'react'

import { Context } from '../../contexts/AuthContext'

import HistoryService from '../../services/history/HistoryService'

const SignIn: React.FC = () => {
    const { userEmail, setUserEmail, userPassword, setUserPassword, user, authenticated, handleLogin, handleLogout } = useContext(Context);

    if(authenticated) {
        console.log("Usuário já está logado!");
        HistoryService.push('/menu');
    }

    return (
        <div>
            <form onSubmit={ handleLogin }>
                <input 
                    type="text"
                    placeholder="Digite o seu e-mail"
                    onChange={ event => setUserEmail(event.target.value) }
                    value={ userEmail }
                />
                <input 
                    type="password"
                    placeholder="Digite a sua senha"
                    onChange={ event => setUserPassword(event.target.value) }
                    value={ userPassword }
                />
                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    )
}

export default SignIn