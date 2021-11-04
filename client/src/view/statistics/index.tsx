import React, { useState } from 'react'
import DefaultButton from '../../components/default_button';
import SelectInput from '../../components/select_input';
import TextInput from '../../components/textInput';
import './styles.css'

const Statistics: React.FC = () => {
    const [reportTypeValue, setReportTypeValue] = useState('Vendas de jogos')
    const [beginPeriodValue, setBeginPediodValue] = useState('')
    const [endPediodValue, setEndPeriodValue] = useState('')

    
    return (
        <div className="page">
            <h1 className="page-title">Estatísticas</h1>
            <div className="statistics">
                <SelectInput value={reportTypeValue} label='Tipo de relatório' identification='report-type' options={[{ value: 'sales', label: 'Vendas de jogos' }, { value: 'tickets', label: 'Tickets resolvidos' }]} onChange={select => setReportTypeValue(select)} />
                <TextInput text="Início do período" value={beginPeriodValue} onChange={newBeginPeriod => setBeginPediodValue(newBeginPeriod)} hasLabel />
                <TextInput text="Fim do período" value={endPediodValue} onChange={newEndPeriod => setEndPeriodValue(newEndPeriod)} hasLabel />
                <DefaultButton text="Gerar relatório" colorClass="primary" onClick={() => console.log('gerar relatorio')} />
            </div>
        </div>
    )
}
export default Statistics