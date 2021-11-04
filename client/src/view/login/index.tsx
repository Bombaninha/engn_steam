import React, { useContext, useState, useEffect } from 'react'
import Path from '../../constant/Path'
import { Context } from '../../contexts/AuthContext'

import HistoryService from '../../services/history/HistoryService'

import { InputBox, LoginButton, LoginContainer, LoginView } from './styles';

const SignIn: React.FC = () => {
    const { user, userEmail, setUserEmail, userPassword, setUserPassword, authenticated, handleLogin } = useContext(Context);
    const [ path, setPath ] = useState('');
    //console.log(user);

    useEffect(() => {
        if(authenticated) {
            if (user
                && Object.keys(user).length === 0
                && Object.getPrototypeOf(user) === Object.prototype) {
                console.log('nao faca nada');
            } else {
                switch(user.role.label) {
                    case 'admin':
                    case 'staff':
                        setPath(Path.STATISTICS);
                    break;
                    case 'dev':
                        setPath(Path.GAME_MANAGEMENT);
                    break;
                    case 'user':
                        setPath(Path.STORE);
                    break;
                    default:
                        break;
                
                console.log("Usuário já está logado!");
                HistoryService.push(path);
                }
            }
        }
      }, [user]);

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