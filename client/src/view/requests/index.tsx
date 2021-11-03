import React, { useState } from 'react'
import RequestCard from '../../components/RequestCard'
import RequestDetails from '../../components/RequestDetails'
import './styles.css'

const Request: React.FC = () => {
    const [requestList, setRequestList] = useState<{ id: string, type: 'add' | 'edit' | 'delete' }[]>([
        { id: '000001', type: 'add' },
        { id: '000002', type: 'add' },
        { id: '000003', type: 'delete' },
        { id: '000004', type: 'edit' }
    ])
    const [currentRequest, setCurrentRequest] = useState<{ id: string, type: 'add' | 'edit' | 'delete' } | undefined>(undefined)

    const returnRequestList = (requestId: string) => {
        const newList = requestList.filter(item => item.id !== requestId)
        setRequestList([...newList])
        setCurrentRequest(undefined)
    }

    return (
        <div className="page">
            {currentRequest ?
                <RequestDetails request={currentRequest} onAccept={() => returnRequestList(currentRequest.id)} onDenny={() => returnRequestList(currentRequest.id)} />
                :
                <>
                    <h1 className="page-title">Pedidos</h1>
                    {requestList.map(requestItem => <RequestCard id={requestItem.id} type={requestItem.type} onClick={value => setCurrentRequest(value)} />)}
                </>
            }
        </div>
    )
}
export default Request