import React from 'react'
import DefaultButton from '../default_button'
import './styles.css'

export interface InfoPageProps {
    infoText: string
    buttonText: string
    cancelButton?: boolean
    onClick: () => void
    onCancel?: () => void
}

const InfoPage: React.FC<InfoPageProps> = ({ infoText, buttonText, cancelButton, onClick, onCancel }) => {
    return (
        <div className="info-wrapper">
            <p className="main-info">{infoText}</p>
            <div className={`button-wrapper ${cancelButton ? 'with-cancel-button' : ''}`}>
                {cancelButton ? <DefaultButton text='Cancelar' colorClass="secondary" onClick={onCancel ? onCancel : () => { }} /> : <></>}
                <DefaultButton text={buttonText} colorClass="primary" onClick={onClick} />
            </div>
        </div>
    )
}
export default InfoPage