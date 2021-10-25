import React, { useState } from 'react'
import './styles.css'

export interface FilterByCategoryProps {
    categories: string[]
    onChange: (value: string[]) => void
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ categories, onChange }) => {
    const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newSelectedCheckbox;
        if (event.target.checked) {
            newSelectedCheckbox = [...selectedCheckbox, event.target.name];
        } else {
            newSelectedCheckbox = selectedCheckbox.filter(item => item !== event.target.name);
        }
        setSelectedCheckbox(newSelectedCheckbox);
        onChange(newSelectedCheckbox);
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
                                name={item}
                                onChange={handleChange}
                            />
                            <label htmlFor={item}>{item}</label>
                        </div>
                    )
                })}
            </form>
        </div>
    )
}
export default FilterByCategory