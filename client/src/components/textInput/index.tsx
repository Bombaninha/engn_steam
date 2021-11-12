import React from 'react'
import './styles.css'

export interface TextInputProps {
	onChange: (value: string) => void
	value: string
	text: string
	hasLabel?: boolean
	isPassword?: boolean
	isNumber?: boolean
	uniqueKey?: string
	wrongInput?: boolean
	errorMessage?: string
}

const TextInput: React.FC<TextInputProps> = ({
	text,
	value,
	onChange,
	isPassword,
	isNumber,
	uniqueKey,
	hasLabel,
	wrongInput,
	errorMessage
}) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
		<div className="text-input-wrapper">
			<div className="text-input-field">
				{hasLabel ? <label>{text}</label> : <></>}
				<input
					type={isPassword ? 'password' : isNumber ? 'number' : 'text'}
					id={`input-field-${uniqueKey ?? ''}`}
					aria-labelledby={`input-label-${uniqueKey ?? ''}`}
					onChange={handleOnChange}
					value={value}
					placeholder={hasLabel ? '' : text}
					className={`default-text-input ${wrongInput ? "wrong-input" : ""}`}
				/>
			</div>
			{wrongInput ? <span className="error-message">{errorMessage}</span> : <></>}
		</div>
	)
}
export default TextInput