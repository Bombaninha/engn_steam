import React from 'react'
import './styles.css'

export interface TextInputProps {
	onChange: (value: string) => void
	value: string
	text: string
	hasLabel?: boolean
	password?: boolean
	uniqueKey?: string
	wrongInput?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
	text,
	value,
	onChange,
	password,
	uniqueKey,
	hasLabel,
	wrongInput
}) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value)
	}

	return (
		<div className="text-input-wrapper">
			{hasLabel ? <label>{text}</label> : <></>}
			<input
				type={password ? 'password' : 'text'}
				id={`input-field-${uniqueKey ?? ''}`}
				aria-labelledby={`input-label-${uniqueKey ?? ''}`}
				onChange={handleOnChange}
				value={value}
				placeholder={hasLabel ? '' : text}
            	className={`default-text-input ${wrongInput? "wrong-input" : ""}`}
			/>
		</div>
	)
}
export default TextInput