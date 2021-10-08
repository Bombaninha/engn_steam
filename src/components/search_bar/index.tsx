import React, { useState } from 'react'
import './styles.css'

export interface SearchBarProps {
	placeholder: string
    onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder, onChange}) => {
    const [value, setValue] = useState('')

    const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
        event.preventDefault()
		onChange(event.target.value)
	}

    return (
        <form>
            <div className='search-bar-wrapper'>
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={handleChange} 
                />
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    )
}
export default SearchBar