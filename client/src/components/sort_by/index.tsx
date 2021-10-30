import React from 'react'
import SortEnum from '../../types/SortByEnum'
import './styles.css'

export interface SorterProps {
    onChange: (value: SortEnum) => void
}

const Sorter: React.FC<SorterProps> = ({ onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let selected = (event.target.value) as SortEnum;
        onChange(selected);
    }

    return (
        <div className="sorter-wrapper">
            <h2>Ordenar por</h2>
            <select name="sort-by" id="sort-by" className="sort-by-select" onChange={handleChange}>
                <option key={SortEnum.ALPHABETICAL_ASC} value={SortEnum.ALPHABETICAL_ASC}>Alfabético (A-Z)</option>
                <option key={SortEnum.ALPHABETICAL_DESC} value={SortEnum.ALPHABETICAL_DESC}>Alfabético (Z-A)</option>
                <option key={SortEnum.DATE_ASC} value={SortEnum.DATE_ASC}>Mais recente</option>
                <option key={SortEnum.DATE_DESC} value={SortEnum.DATE_DESC}>Mais antigo</option>
            </select>
        </div>
    )
}
export default Sorter