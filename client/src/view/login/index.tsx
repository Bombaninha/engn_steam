import React, { useContext } from 'react'
import Path from '../../constant/Path'
import { Context } from '../../contexts/AuthContext'
import { InputBox, LoginButton, LoginContainer, LoginView, LoginMessageContainer, ForgetPassword, WithoutAccountContainer, CreateAccountButton, Separator, LoginErrors } from './styles';

import HistoryService from '../../services/history/HistoryService'

const SignIn: React.FC = () => {
    const { userEmail, setUserEmail, userPassword, setUserPassword, authenticated, handleLogin } = useContext(Context);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (authenticated) {
        let path = '';
        switch (user.role.label) {
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
        <form onSubmit={handleLogin}>
            <LoginView>
                <LoginContainer>

                    <LoginMessageContainer>
                        <h1>Bem-vindo à loja</h1>
                    </LoginMessageContainer>

                    <InputBox
                        type="text"
                        placeholder="Email"
                        onChange={event => setUserEmail(event.target.value)}
                        value={userEmail}
                    />
                    <InputBox
                        type="password"
                        placeholder="Senha"
                        onChange={event => setUserPassword(event.target.value)}
                        value={userPassword}
                    />

                    <LoginErrors>
                        Login ou senha incorretos!
                    </LoginErrors>

                    <LoginButton type="submit"> Iniciar Sessão </LoginButton>

                    <ForgetPassword>
                        <a href="/forget-password">Esqueceu sua senha?</a>
                    </ForgetPassword>

                    <WithoutAccountContainer>
                        <Separator>Ainda não tem uma conta?</Separator>
                        <a href="/register">
                            <CreateAccountButton>
                                Cadastrar-se
                            </CreateAccountButton>
                        </a>
                    </WithoutAccountContainer>
                </LoginContainer>
            </LoginView>
        </form>
    )
}

export default SignIn