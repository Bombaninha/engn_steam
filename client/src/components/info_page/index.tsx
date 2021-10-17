import React from 'react'
import DefaultButton from '../default_button'
import './styles.css'

export interface InfoPageProps {
    infoText: string
    buttonText: string
    onClick: (value: boolean) => void
}

const InfoPage: React.FC<InfoPageProps> = ({infoText, buttonText, onClick}) => {
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