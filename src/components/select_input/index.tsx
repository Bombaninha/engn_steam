import React from 'react'
import './styles.css'

export interface SelectInputProps {
    value: string
    options: {value: string, label: string}[]
    identification: string
    label: string
	onChange: (value: string) => void
}

const SelectInput: React.FC<SelectInputProps> = ({value, identification, label, options, onChange}) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value)
	}
  
    return (
        <div className="select-box-wrapper">
            <label htmlFor={identification}>{label}</label>
            <select name={identification} value={value} onChange={handleOnChange} className="select-box">
                {options.map((item) => {
                    return <option value={item.value}>{item.label}</option>
                })}
            </select>
        </div>
    )
}
export default SelectInput