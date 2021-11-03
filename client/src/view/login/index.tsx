import React, { useContext, useState } from 'react'

import { Context } from '../../contexts/AuthContext'
import { InputBox, LoginButton, LoginContainer, LoginView } from './styles';

const SignIn: React.FC = () => {
    const { authenticated, handleLogin, handleLogout } = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        handleLogin(username, password);
        setUsername('');
        setPassword('');
    }

    return (
        <>
            <LoginView>
                <LoginContainer>

                    <InputBox
                        type="text"
                        placeholder="Usuário"
                        onChange={event => setUsername(event.target.value)}
                        value={username}
                    />
                    <InputBox
                        type="password"
                        placeholder="Senha"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />

                    <LoginButton onClick={handleLoginClick}> Entrar </LoginButton>
                    {/* <LoginButton onClick={handleLogout}> Sair </LoginButton> */}

                </LoginContainer>
            </LoginView>
        </>
    )
}

export default SignIn