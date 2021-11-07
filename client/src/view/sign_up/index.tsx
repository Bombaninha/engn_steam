import React, { FormEvent, useState } from 'react'
import { InputBox, ForgetPasswordButton, ForgetPasswordContainer, ForgetPasswordView, ForgetPasswordMessageContainer, ForgetPasswordErrors, InputCheckbox, CheckboxContainer } from './styles';

import api, { toastConfig } from '../../api';

import HistoryService from '../../services/history/HistoryService'
import { toast } from 'react-toastify';

const SignUp: React.FC = () => {
    const [name, setName] = useState('Lucas')
    const [email, setEmail] = useState('adminobrabo@gmail.com')
    const [password, setPassword] = useState('teste')
    const [confirmPassword, setConfirmPassword] = useState('teste')
    const [isDev, setIsDev] = useState(false);

    const [validateName, setValidateName] = useState('')
    const [validateEmail, setValidateEmail] = useState('')
    const [validatePassword, setValidatePassword] = useState('')
    const [validateConfirmPassword, setValidateConfirmPassword] = useState('')

    const handleClickNameInput = () => {
        setValidateName('')
    }

    const handleClickEmailInput = () => {
        setValidateEmail('')
    }

    const handleClickPasswordInput = () => {
        setValidatePassword('')
    }

    const handleClickPasswordConfirmInput = () => {
        setValidateConfirmPassword('')
    }

    const handleCheckboxClick = () => {
        setIsDev(!isDev);
    }

    const handleSignIn = async (event: FormEvent) => {
        event.preventDefault();

        const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

        try {

            if (format.test(name) || name === '')
                setValidateName('error');

            const res = await api.get(`/users?email=${email}`);
            const data = res.data as Array<any>;

            if (data.length > 0)
                setValidateEmail('error');

            if (password.length < 5)
                setValidatePassword('error');

            if (password !== confirmPassword)
                setValidateConfirmPassword('error');

            const result = await api.get(`/roles?label=dev`);
            const dataRole = result.data as Array<any>;

            const roleId = (dataRole.length > 0) ? dataRole[0].id : '';

            await api.post('/users', {
                name: name,
                email: email,
                password: password,
                role_id: roleId
            });

            toast.success("Conta criada com sucesso!", toastConfig);
            HistoryService.push('/');
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            toast.error("Erro " + status + "\n" + errorMsg, toastConfig);
        }
    }

    return (
        <form onSubmit={handleSignIn}>
            <ForgetPasswordView>
                <ForgetPasswordContainer>

                    <ForgetPasswordMessageContainer>
                        <h1>Preencha seus dados</h1>
                    </ForgetPasswordMessageContainer>

                    <InputBox
                        type="text"
                        className={validateName}
                        placeholder="Nome"
                        onChange={event => setName(event.target.value)}
                        onClick={handleClickNameInput}
                        value={name}
                    />

                    <ForgetPasswordErrors className={validateName}>
                        Nome não pode ser vazio ou conter caracteres especiais
                    </ForgetPasswordErrors>

                    <InputBox
                        type="text"
                        className={validateEmail}
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        onClick={handleClickEmailInput}
                        value={email}
                    />

                    <ForgetPasswordErrors className={validateEmail}>
                        Endereço de email já em uso
                    </ForgetPasswordErrors>

                    <InputBox
                        type="password"
                        className={validatePassword}
                        placeholder="Senha"
                        onChange={event => setPassword(event.target.value)}
                        onClick={handleClickPasswordInput}
                        value={password}
                    />

                    <ForgetPasswordErrors className={validatePassword}>
                        Senha deve conter pelo menos 5 caracteres.
                    </ForgetPasswordErrors>

                    <InputBox
                        type="password"
                        className={validateConfirmPassword}
                        placeholder="Repetir Senha"
                        onChange={event => setConfirmPassword(event.target.value)}
                        onClick={handleClickPasswordConfirmInput}
                        value={confirmPassword}
                    />

                    <ForgetPasswordErrors className={validateConfirmPassword}>
                        Senha deve ser idêntica ao campo anterior.
                    </ForgetPasswordErrors>

                    <CheckboxContainer>
                        <InputCheckbox id="checkbox-role" type="checkbox" checked={isDev} onChange={handleCheckboxClick} />
                        <label htmlFor="checkbox-role"> sou desenvolvedor de jogos</label>
                    </CheckboxContainer>

                    <ForgetPasswordButton type="submit"> Cadastrar </ForgetPasswordButton>
                </ForgetPasswordContainer>
            </ForgetPasswordView>
        </form>
    )
}
export default SignUp