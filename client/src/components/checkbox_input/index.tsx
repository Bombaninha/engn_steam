import React from 'react'
import './styles.css'

export interface CheckboxInputProps {
	onChange: (value: boolean) => void
	textLabel: string
	identification: string
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
	textLabel,
	onChange,
	identification,
}) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked)
	}

	return (
        <div className="checkbox-input">
            <input 
                type="checkbox" 
                name={identification} 
                onChange={handleOnChange} 
            />
            <label htmlFor={identification}>{textLabel}</label>
        </div>
	)
}
export default CheckboxInput