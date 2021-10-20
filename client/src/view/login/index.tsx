import React, { useContext } from 'react'

import { Context } from '../../contexts/AuthContext'

const SignIn: React.FC = () => {
    const { authenticated, handleLogin, handleLogout } = useContext(Context);
    console.log('Login', authenticated);    
    return (
        <div>
            <button type="button" onClick={ handleLogin }>Entrar</button>
            <button type="button" onClick={ handleLogout }>Sair</button>
        </div>
    )
}

export default SignIn