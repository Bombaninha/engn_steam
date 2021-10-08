import React, { useState } from 'react'
import './styles.css'

export interface SelectInputProps {
    value: string
    options: {value: string, label: string}[]
	onChange: (value: string) => void
}

const SelectInput: React.FC<SelectInputProps> = ({value, options, onChange}) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value)
	}
  
    return (
        <select value={value} onChange={handleOnChange} className="select-box">
            {options.map((item) => {
                return <option value={item.value}>{item.label}</option>
            })}
        </select>
    )
}
export default SelectInput