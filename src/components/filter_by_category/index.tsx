import React, { useState } from 'react'
import './styles.css'

export interface FilterByCategoryProps {
    categories: {id: string, label: string}[]
	onChange: (value: string[]) => void
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({categories, onChange}) => {
    const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
            setSelectedCheckbox([...selectedCheckbox, event.target.name])
        } else {
            setSelectedCheckbox(selectedCheckbox.filter(item => item !== event.target.name))
        }
        onChange(selectedCheckbox)
	}

    return (
        <div className="filter-by-category-wrapper">
            <h2>Filtrar por categoria</h2>
            <form className="">
                {categories.map((item) => {
                    return (
                        <div className="input-wrapper">
                            <input 
                                type="checkbox" 
                                name={item.id} 
                                onChange={handleChange} 
                            />
                            <label htmlFor={item.id}>{item.label}</label>
                        </div>
                    ) 
                })}
            </form>
        </div>
    )
}
export default FilterByCategory