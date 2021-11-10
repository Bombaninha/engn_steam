import React from 'react'
import './styles.css'

export interface DefaultButtonProps {
	text: string
	colorClass?: 'primary' | 'secondary' | 'tertiary'
    onClick: () => void
}


const DefaultButton: React.FC<DefaultButtonProps> = ({text, colorClass, onClick}) => {
    const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		event.preventDefault()
		onClick()
	}
    
    return (
        <button className={`button ${colorClass}`} onClick={handleClick}>
            {text}
        </button>
    )
}
export default DefaultButton