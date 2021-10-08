import React, { useState } from 'react'
import TextInput from '../../components/textInput'

const Store: React.FC = () => {
    const [input, setInput] = useState('')

    return (
        <div>
            <h1>Loja</h1>
            <form>
                <TextInput placeholder='Sou um input teste' value={input} onChange={input => setInput(input)} />
            </form>
        </div>
    )
}
export default Store