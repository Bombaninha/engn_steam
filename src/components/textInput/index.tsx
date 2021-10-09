import React from 'react'
import './styles.css'

export interface TextInputProps {
	onChange: (value: string) => void
	value: string
	placeholder: string
	password?: boolean
	uniqueKey?: string
}

const TextInput: React.FC<TextInputProps> = ({
	placeholder,
	value,
	onChange,
	password,
	uniqueKey,
}) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
        <input
            type={password ? 'password' : 'text'}
            id={`input-field-${uniqueKey ?? ''}`}
            aria-labelledby={`input-label-${uniqueKey ?? ''}`}
            onChange={handleOnChange}
            value={value}
            placeholder={placeholder}
            className="default-text-input"
        />
	)
}
export default TextInput