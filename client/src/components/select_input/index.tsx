import React from 'react'
import './styles.css'

export interface SelectInputProps {
    value: string
    options: { value: string, label: string, key: string; }[]
    identification: string
    label: string;
    isAdd?: boolean
    //key: string;
    onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ value, identification, label, isAdd, options, onChange }) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className={isAdd ? "mgmt-select-box-wrapper" : "select-box-wrapper"} >
            <label htmlFor={identification}>{label}</label>
            <select name={identification} value={value}
                onChange={handleOnChange}
                className={isAdd ? "mgmt-select-box" : "select-box"} >
                {
                    options.map((item) => {
                        return <option key={item.key} value={item.value}>{item.label}</option>
                    })
                }
            </select>
        </div >
    )
}
export default SelectInput