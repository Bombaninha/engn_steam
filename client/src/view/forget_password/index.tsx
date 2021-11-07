import React, { FormEvent, useState } from 'react'
import { InputBox, ForgetPasswordButton, ForgetPasswordContainer, ForgetPasswordView, ForgetPasswordMessageContainer, ForgetPasswordErrors } from './styles';

import api, { toastConfig } from '../../api';
import { toast } from 'react-toastify';
const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState('adminobrabo@gmail.com')
    const [request, setRequest] = useState('')
    const [disabledButton, setDisabledButton] = useState(false)

    const handleForgetPassword = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await api.post('/forgot-password', {
                email: email
            });

            toast.success("Email enviado!", toastConfig);
            setRequest('success');
            setDisabledButton(true);
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;

            setRequest('error');
            setDisabledButton(false);
            toast.error("Erro " + status + "\n" + errorMsg, toastConfig);
        }
    }

    const handleClickInput = () => {
        if (request !== 'success') {
            setRequest('');
            setDisabledButton(false);
        }
    }

    return (
        <form onSubmit={handleForgetPassword}>
            <ForgetPasswordView>
                <ForgetPasswordContainer>
                    <ForgetPasswordMessageContainer className={request}>
                        {(request === 'success'
                            ? <h1>E-mail de recuperação enviado para</h1>
                            : <h1>Informe seu endereço de email</h1>
                        )}
                    </ForgetPasswordMessageContainer>
                    <InputBox
                        type="text"
                        className={request}
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        onClick={handleClickInput}
                        value={email}
                        disabled={disabledButton}
                    />
                    <ForgetPasswordErrors className={request}>
                        Login ou senha incorretos!
                    </ForgetPasswordErrors>

                    <ForgetPasswordButton className={request} type="submit"> Enviar e-mail de recuperação </ForgetPasswordButton>
                </ForgetPasswordContainer>
            </ForgetPasswordView>
        </form>
    )
}
export default ForgetPassword