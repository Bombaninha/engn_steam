import DefaultButton from "../default_button"

interface RequestDetailsProps {
    request: { id: string, type: 'add' | 'edit' | 'delete' }
    onAccept: () => void
    onDenny: () => void
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ request, onAccept, onDenny }) => {
    return (
        <>
            <h1 className="page-tile"> Pedido #{request.id} </h1>
            <span>Desenvolvedor: </span>
            <span>{request.type === 'add' ? 'Adição' : request.type === 'edit' ? 'Edição' : 'Remoção'} de jogo</span>
            <div>
                <DefaultButton text="Recusar pedido" colorClass="secondary" onClick={onDenny} />
                <DefaultButton text="Aprovar pedido" colorClass="primary" onClick={onAccept} />
            </div>
        </>
    )
}
export default RequestDetails