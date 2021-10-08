import React from 'react'
import './styles.css'

export interface SearchBarProps {
	placeholder: string
    onSubmit: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder, onSubmit}) => {
    const handleClick = (
		event: React.FormEvent<HTMLFormElement>,
	) => {
        event.preventDefault()
		onSubmit()
	}

    return (
        <form onSubmit={handleClick}>
            <div className='search-bar-wrapper'>
                <input
                    type="text"
                    placeholder={placeholder} 
                />
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    )
}
export default SearchBar