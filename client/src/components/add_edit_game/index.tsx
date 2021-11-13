import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api, { toastConfig } from '../../api'
import { emptyTGame, TGame } from "../../types/TGame"
import DefaultButton from "../default_button"
import InfoPage from '../info_page'
import SelectInput from '../select_input'
import TextInput from "../textInput"
import TextArea from '../text_area'
import './styles.css'

interface AddEditGameProps {
    gameItem?: TGame
    addRequest: (game: TGame) => Promise<void>
    onReturn: () => void
}

const AddEditGame: React.FC<AddEditGameProps> = ({ gameItem, addRequest, onReturn }) => {
    const [game, setGame] = useState(gameItem ? gameItem : emptyTGame)
    const [categories, setCategories] = useState<Array<any>>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [isOperationFinished, setIsOperationFinished] = useState(false)

    async function getCategories() {
        try {
            const res: any = await api.get('/categories')
            const cat: Array<any> = res.data;

            const categoriesOptions = cat.map(item => {
                return { key: item.id, value: item.id, label: item.name }
            });
            setCategories(categoriesOptions);

            const selectedCategory = (categories.length === 0) ? '' : categories[0].id;
            setSelectedCategory(selectedCategory);
        } catch {
            const errorMsg: string = "Error getting categories.";
            toast.error(errorMsg, toastConfig);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    const handleAddEditGame = () => {
        setIsOperationFinished(true)
        addRequest(game);
    }

    if (!categories)
        return <></>;

    return (
        <>
            {isOperationFinished ?
                <InfoPage infoText='Sua solicitação foi enviada com sucesso' buttonText='Voltar ao menu principal' onClick={onReturn} />
                :
                <div className="add-edit-game page">
                    <h1 className="page-title">Adicionar jogo</h1>
                    <h2 className="page-subtitle">Informações do jogo</h2>
                    <TextInput hasLabel text="Nome" value={game.name} onChange={newTitle => setGame({ ...game, name: newTitle })} />
                    <TextInput hasLabel text="Preço" value={game.price.toString()} isNumber onChange={newPrice => setGame({ ...game, price: Number(newPrice) })} />

                    <TextArea labelText="Descrição" value={game.description} onChange={newDescription => setGame({ ...game, description: newDescription })} />
                    <br />
                    <SelectInput isAdd value={selectedCategory} label='Categoria' identification='category'
                        options={categories}
                        onChange={(select: any) => { game.categories = [select.key] }}
                    />
                    <br />
                    <DefaultButton text="Fazer pedido de adição" colorClass="primary" onClick={() => handleAddEditGame()} />

                </div>
            }
        </>
    )
}
export default AddEditGame