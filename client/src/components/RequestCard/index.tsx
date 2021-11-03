import DefaultButton from "../default_button"
import './styles.css'

interface RequestCardProps {
    id: string
    type: 'add' | 'edit' | 'delete'
    onClick: (value: { id: string, type: 'add' | 'edit' | 'delete' }) => void
}

const RequestCard: React.FC<RequestCardProps> = ({ id, type, onClick }) => {
    const handleButtonClick = (requestInfo: { id: string, type: 'add' | 'edit' | 'delete' }) => {
        onClick(requestInfo)
    }

    return (
        <div className="request-card">
            <div className="request-card__info-wrapper">
                <p>Pedido #{id}</p>
                <span>{type === 'add' ? 'Adição' : type === 'edit' ? 'Edição' : 'Remoção'} de jogo</span>
            </div>
            <DefaultButton text="Ver detalhes" colorClass="secondary" onClick={() => handleButtonClick({ id: id, type: type })} />
        </div>
    )
}
export default RequestCard