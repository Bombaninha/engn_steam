import React, { useContext, useState, useEffect } from 'react'
import Path from '../../constant/Path'
import { Context } from '../../contexts/AuthContext'

import HistoryService from '../../services/history/HistoryService'

import { InputBox, LoginButton, LoginContainer, LoginView } from './styles';

const SignIn: React.FC = () => {
    const { userEmail, setUserEmail, userPassword, setUserPassword, authenticated, handleLogin } = useContext(Context);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(authenticated) {
        let path = '';
        switch(user.role.label) {
            case 'user':
                path = Path.LIBRARY;
            break;
            case 'dev':
                path = Path.GAME_MANAGEMENT;
            break;
            case 'staff':
            case 'admin':
                path = Path.STATISTICS;
            break;
        }
        HistoryService.push(path);
    }

    return (
            <form onSubmit={ handleLogin }>
                <LoginView>
                    <LoginContainer>

                        <InputBox
                            type="text"
                            placeholder="Digite o seu e-mail"
                            onChange={ event => setUserEmail(event.target.value) }
                            value={ userEmail }
                        />
                        <InputBox
                            type="password"
                            placeholder="Digite a sua senha"
                            onChange={ event => setUserPassword(event.target.value) }
                            value={ userPassword }
                        />

                        <LoginButton type="submit"> Entrar </LoginButton>

                    </LoginContainer>
                </LoginView>
            </form>
    )
}

export default SignIn