import React, { useState } from 'react'
import DefaultButton from '../default_button'
import './styles.css'

export interface InfoPageProps {
    infoText: string
    buttonText: string
    onClick: (value: boolean) => void
}

const InfoPage: React.FC<InfoPageProps> = ({infoText, buttonText, onClick}) => {
    const [input, setInput] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [select, setSelect] = useState('manga')

    const handleClick = () => {
        onClick(false)
    }

    return (
        <div className="info-wrapper">
            <p className="main-info">{infoText}</p>
            <DefaultButton text={buttonText} colorClass="primary" onClick={handleClick}/>
        </div>
    )
}
export default InfoPage