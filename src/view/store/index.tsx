import React, { useState } from 'react'
import CheckboxInput from '../../components/checkbox_input'
import SelectInput from '../../components/select_input'
import TextInput from '../../components/textInput'

const Store: React.FC = () => {
    const [input, setInput] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [select, setSelect] = useState('manga')

    return (
        <div>
            <h1>Loja</h1>
            <form>
                <TextInput placeholder='Sou um input teste' value={input} onChange={input => setInput(input)} />
                <CheckboxInput textLabel='Sou uma checkbox de teste' identification='test' onChange={checked => setCheckbox(checked)}/>
                <SelectInput value={select} options={[{value: 'laranja', label: 'Laranja'}, {value: 'limao', label: 'Limão'}, {value: 'coco', label: 'Coco'}, {value: 'manga', label: 'Manga'}]} onChange={select => setSelect(select)} />
            </form>
        </div>
    )
}
export default Store