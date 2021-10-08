import React, { useState } from 'react'
import FilterByCategory from '../../components/filter_by_category'

const Library: React.FC = () => {
    const [currentCategories, setCurrentCategories] = useState<string[]>([])
    return (
        <>
            <h1 className="page-title">Library</h1>
            <FilterByCategory categories={[{id: 'c1', label: 'categoria 1'}, {id: 'c2', label: 'categoria 2'}]} onChange={newList => {setCurrentCategories(newList)}}/>
        </>
    )
}

export default Library