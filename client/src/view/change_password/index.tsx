import React, { FormEvent, useEffect, useState } from 'react'
import { InputBox, ForgetPasswordButton, ForgetPasswordContainer, ForgetPasswordView, ForgetPasswordMessageContainer, ForgetPasswordErrors } from './styles';

import api from '../../api';

import queryString from 'query-string'
import HistoryService from '../../services/history/HistoryService'

const ChangePassword: React.FC = () => {
    const [email, setEmail] = useState('adminobrabo@gmail.com')
    const [password, setPassword] = useState('teste')
    const [userToken, setuserToken] = useState<String | String[]>('');
    const [request, setRequest] = useState('')

    useEffect(() => {
        const value = queryString.parse(window.location.search);
        const token = value.token;

        if(!token) {
            alert('Você não deveria estar aqui!')
            HistoryService.push('/');
        } else {
            setuserToken(token);
        }
    }, [userToken]);

    const handleClickInput = () => {
        if(request !== 'success') {
            setRequest('');
        }
    }

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const res = await api.post('/change-password', {
                email: email,
                password: password,
                redefine_password_token: userToken
            });

            alert("Senha alterada com sucesso!");
            HistoryService.push('/');

            setRequest('success');
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;

            setRequest('error');
            alert("Erro " + status + "\n" + errorMsg);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <ForgetPasswordView>
                <ForgetPasswordContainer>

                    <ForgetPasswordMessageContainer className={request}>
                        <h1>Informe seu endereço de email atual e sua nova senha</h1>  
                    </ForgetPasswordMessageContainer>

                    <InputBox
                        type="text"
                        className={request}
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        onClick={handleClickInput}
                        value={email}
                    />
                    <InputBox
                        type="password"
                        className={request}
                        placeholder="Nova Senha"
                        onChange={event => setPassword(event.target.value)}
                        onClick={handleClickInput}
                        value={password}
                    />
                    <ForgetPasswordErrors className={request}>
                        Email ou Token inválido!
                    </ForgetPasswordErrors>
                    
                    <ForgetPasswordButton className={request} type="submit"> Trocar senha </ForgetPasswordButton>
                </ForgetPasswordContainer>
            </ForgetPasswordView>
        </form>
    )
}
export default ChangePassword