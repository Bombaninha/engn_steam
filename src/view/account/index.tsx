import React, { useState } from 'react'
import DefaultButton from '../../components/default_button'
import TextInput from '../../components/textInput'
import './styles.css'

const Account: React.FC = () => {
    const [username, setUserName] = useState('Fulaninho')
    const [mail, setMail] = useState('fulaninho_gameplay@gmail.com')
    const password = 'SouUmaSenha'
    const [changePassword, setChangePassword] = useState(false)

    const showDisplay = () => {
        setChangePassword(true)
    }

    return (
        <div className="account-wrapper">
            <h1 className="page-title">Conta</h1>
            <h2>Dados pessoais</h2>
            <TextInput onChange={newUsername => setUserName(newUsername)} value={username} text={'Nome: '} hasLabel />
            <TextInput onChange={newMail => setMail(newMail)} value={mail} text={'Email: '} hasLabel />
            <button className="show-display-button" onClick={() => showDisplay()}>Alterar senha</button>
            {changePassword ? 
                <div>
                    <TextInput onChange={currentPassword => {console.log(currentPassword === password); return currentPassword === password}} value={''} text={'Senha atual: '} hasLabel password />
                    <TextInput onChange={currentPassword => {console.log(currentPassword === password); return currentPassword === password}} value={''} text={'Nova senha: '} hasLabel password />
                    <TextInput onChange={currentPassword => {console.log(currentPassword === password); return currentPassword === password}} value={''} text={'Repetir nova senha: '} hasLabel password />
                </div>
                : <></>}
            <div className="button-wrapper">
                <DefaultButton text={'Cancelar alterções'} colorClass={'secondary'} onClick={() => console.log('Faço nada')}/>
                <DefaultButton text={'Salvar alterações'} colorClass={'primary'} onClick={() => console.log('Também faço nada')}/>
            </div>
        </div>
    )
}
export default Account
// <TextInput onChange={} value={} text={} hasLabel password />
// <TextInput onChange={} value={} text={} hasLabel password />