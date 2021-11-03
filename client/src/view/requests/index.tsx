import React from 'react'
import RequestCard from '../../components/RequestCard'
import './styles.css'

const Request: React.FC = () => {
    return (
        <div className="page">
            <h1 className="page-title">Pedidos</h1>
            <RequestCard id="000215" type="add" onClick={() => console.log('ou')} />
        </div>
    )
}
export default Request