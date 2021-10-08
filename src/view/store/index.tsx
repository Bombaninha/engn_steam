import React, { useState } from 'react'
import CheckboxInput from '../../components/checkbox_input'
import TextInput from '../../components/textInput'

const Store: React.FC = () => {
    const [input, setInput] = useState('')
    const [checkbox, setCheckbox] = useState(false)

    return (
        <div>
            <h1>Loja</h1>
            <form>
                <TextInput placeholder='Sou um input teste' value={input} onChange={input => setInput(input)} />
                <CheckboxInput textLabel='Sou uma checkbox de teste' identification='test' onChange={checked => setCheckbox(checked)}/>
            </form>
        </div>
    )
}
export default Store