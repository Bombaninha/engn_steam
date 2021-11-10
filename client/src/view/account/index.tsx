import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { toastConfig } from '../../api'
import DefaultButton from '../../components/default_button'
import TextInput from '../../components/textInput'
import './styles.css'

const Account: React.FC = () => {
    const [definitiveUsername, setDefinitiveUsername] = useState('Fulaninho')
    const [definitiveMail, setDefinitiveMail] = useState('fulaninho_gameplay@gmail.com')
    const [definitivePassword, setDefinitivePassword] = useState('SouUmaSenha')
    const [username, setUsername] = useState(definitiveUsername)
    const [mail, setMail] = useState(definitiveMail)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [changePassword, setChangePassword] = useState(false)

    const showDisplay = () => {
        setChangePassword(true)
    }

    const clearPasswordInputs = () => {
        setCurrentPassword('')
        setNewPassword('')
        setRepeatNewPassword('')
        setChangePassword(false)
    }

    const resetInputs = () => {
        setUsername(definitiveUsername)
        setMail(definitiveMail)
        clearPasswordInputs()
    }

    const isValidUsername = () => {
        return username !== ''
    }

    const isValidMail = () => {
        return mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    }

    const isValidPassword = () => {
        return newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    }

    const canPasswordUpdate = () => {
        if (currentPassword !== definitivePassword) {
            console.log('as senhas não batem')
            toast.error('As senhas são diferentes', toastConfig);
            return false
        }
        if (!isValidPassword()) {
            console.log('senha nova invalida')
            toast.error('Nova senha inválida', toastConfig);
            return false
        }
        if (newPassword !== repeatNewPassword) {
            console.log('as novas senhas não batem');
            toast.error('As senhas são diferentes', toastConfig);
            return false
        }
        return true
    }

    const updateAccount = () => {
        isValidUsername() ? setDefinitiveUsername(username) : toast.error('Username inválido', toastConfig);
        isValidMail() ? setDefinitiveMail(mail) : toast.error('Email inválido', toastConfig);
        canPasswordUpdate() ? setDefinitivePassword(newPassword) : toast.error('Senha inválida', toastConfig);

        clearPasswordInputs()
    }

    return (
        <div className="account-wrapper">
            <h1 className="page-title">Conta</h1>
            <h2>Dados pessoais</h2>
            <TextInput wrongInput={!isValidUsername()} onChange={newUsername => setUsername(newUsername)} value={username} text={'Nome: '} hasLabel errorMessage={"O nome de usuário não pode ser vazio"} />
            <TextInput wrongInput={!isValidMail()} onChange={newMail => setMail(newMail)} value={mail} text={'Email: '} hasLabel errorMessage={"Por favor, informe um email válido"} />
            <button className="show-display-button" onClick={() => showDisplay()}>Alterar senha</button>
            {changePassword ?
                <div>
                    <TextInput wrongInput={!(definitivePassword === currentPassword)} onChange={newPassword => setCurrentPassword(newPassword)} value={currentPassword} text={'Senha atual: '} hasLabel isPassword errorMessage={"A senha fornecida não bate com a atual"} />
                    <TextInput wrongInput={!isValidPassword()} onChange={newPassword => setNewPassword(newPassword)} value={newPassword} text={'Nova senha: '} hasLabel isPassword errorMessage={"A senha deve ter pelo menos 8 caracteres, 1 caracter numérico, q caracter minúsculo e 1 caracter maiúsculo"} />
                    <TextInput wrongInput={!(newPassword === repeatNewPassword)} onChange={newPassword => setRepeatNewPassword(newPassword)} value={repeatNewPassword} text={'Repetir nova senha: '} hasLabel isPassword errorMessage={"A senha fornecida não bate com a nova senha digitada"} />
                </div>
                : <></>}
            <div className="button-wrapper">
                <DefaultButton text={'Cancelar alterações'} colorClass={'secondary'} onClick={() => resetInputs()} />
                <DefaultButton text={'Salvar alterações'} colorClass={'primary'} onClick={() => updateAccount()} />
            </div>
        </div>
    )
}
export default Account