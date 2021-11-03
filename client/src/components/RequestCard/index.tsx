import DefaultButton from "../default_button"
import './styles.css'

interface RequestCardProps {
    id: string
    type: 'add' | 'edit' | 'delete'
    onClick: () => void
}

const RequestCard: React.FC<RequestCardProps> = ({ id, type, onClick }) => {
    return (
        <div className="request-card">
            <div className="request-card__info-wrapper">
                <p>Pedido #{id}</p>
                <span>{type === 'add' ? 'Adição' : type === 'edit' ? 'Edição' : 'Remoção'} de jogo</span>
            </div>
            <DefaultButton text="Ver detalhes" colorClass="secondary" onClick={onClick} />
        </div>
    )
}
export default RequestCard