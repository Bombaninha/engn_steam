import './styles.css'

interface TextAreaProps {
    labelText: string
    value: string
    onChange: (value: string) => void
}

const TextArea: React.FC <TextAreaProps> = ({labelText, value, onChange}) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(event.target.value)
	}

    return (
        <div className="textarea-wrapper">
            <label>{labelText}</label>
            <textarea className="textarea" value={value} onChange={handleOnChange}/>
        </div>
    )
}
export default TextArea