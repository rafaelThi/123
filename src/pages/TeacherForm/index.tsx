import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/input';
import warningicon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../server/api';

function TeachersForm() {
    const history=useHistory();

    const [name, setname] = useState('');
    const [avatar, setavatar] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [bio, setbio] = useState('');

    const [subject, setsubject] = useState('');
    const [cost, setcost] = useState('');


    const [scheduleItems, setScheduleItem] = useState([
        {weekday: 0, from:'', to:'',}
    ])

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index)=>{
            if(index === position){
                return { ...scheduleItem, [field]:value }

            }
            return scheduleItem;
        });
    setScheduleItem(updatedScheduleItems)
    }


    function createClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes',{
            name, 
            avatar,
            whatsapp, 
            bio, 
            subject, 
            cost: Number(cost),
            sc:scheduleItems
        }).then(()=>{
            alert ('Cadastro relaizado com Sucesso')

            history.push('/');
        }).catch(()=>{
            alert('Error no cadastro')
        })
    }


    function addschedule() {
        setScheduleItem([...scheduleItems, {weekday: 0, from:'', to:'',}
        ]);
    }

    return(
    <div id="page-teacher-form" className="container">
        <PageHeader title="Que incrível que você quer dar aula"
        description="O primeiro passo é preencher esse formulário de inscrição"
        /> 

        <main>
            <form onSubmit={createClass}>
            <fieldset>
                <legend>Seus Dados</legend>
                
                <Input name="name"
                 label= "Nome Completo" 
                value={name} 
                onChange={(e)=>{ 
                    setname(e.target.value)
                }} />

                <Input name="avatar" 
                label= "Avatar" 
                value={avatar} 
                onChange={(e)=>{ 
                    setavatar(e.target.value) 
                }} />

                <Input name="whatsapp" 
                label= "Whatsapp" 
                value={whatsapp} 
                onChange={(e)=>{ 
                    setwhatsapp(e.target.value) 
                }} />

                <Textarea  name="bio" 
                label="biografia" 
                value={bio} 
                onChange={(e)=>{ 
                    setbio(e.target.value) 
                }} />

            </fieldset>

            <fieldset>
                <legend>Sobre a Aula</legend>
                
                <Select 
                    name="subject" 
                    label= "Matéria" 
                    value={subject} 
                    onChange={(e)=>{ 
                        setsubject(e.target.value) 
                    }}
                    options={[
                        {value:'Artes', label: 'Artes'},
                        {value:'Biologia', label: 'Biologia'},
                        {value:'Ciências', label: 'Ciências'},
                        {value:'Educação Física', label: 'Educação Física'},
                        {value:'Física', label: 'Física'},
                        {value:'Geografia', label: 'Geografia'},
                        {value:'História', label: 'História'},
                        {value:'Matemática', label: 'Matemática'},
                        {value:'Química', label: 'Química'},
                        {value:'Português', label: 'Português'},
                    ]}    
                />


                <Input name="cost" 
                label= "Custo da sua hora/aula" 
                value={cost} 
                onChange={(e)=>{ 
                      setcost(e.target.value) 
                }}
                />

            </fieldset>
            <fieldset >
                <legend>
                    Horários disponíveis
                    <button type="button" onClick={addschedule}> + Novo Horário </button>
                </legend>
               
                {scheduleItems.map((scheduleItem, index) =>{
                    return(
                        <div key={scheduleItem.weekday} className="schedule-item">
                    <Select
                    name="weekday" 
                    label= "Dia da Semana" 
                    value=  {scheduleItem.weekday}
                    onChange = {e => setScheduleItemValue(index, 'weekday', e.target.value)}
                    options={[
                        {value:'0', label: 'Domingo'},
                        {value:'1', label: 'Segunda-feira'},
                        {value:'2', label: 'Terça-feira'},
                        {value:'3', label: 'Quarta-feira'},
                        {value:'4', label: 'Quinta-feira'},
                        {value:'5', label: 'Sexta-feira'},
                        {value:'6', label: 'Sábado'},
                    ]}    
                />
                
                <Input name="from" 
                label='Das' 
                type='time' 
                value=  {scheduleItem.from}
                onChange = {e => setScheduleItemValue(index, 'from', e.target.value)}
                />
                <Input name="from" 
                label='Até' 
                type='time' 
                value=  {scheduleItem.to}
                onChange = {e => setScheduleItemValue(index, 'to', e.target.value)}
                />

                </div>
                    )
                })}
                
            </fieldset>
        
        <footer>
            <p>
                <img src={warningicon} alt="aviso importante"/>
                Importante! <br/>
                Preencha todos os Dados!!
            </p>

            <button type='submit'>
                Salvar Cadastro
            </button>
        </footer>
      </form>

        </main>
    </div>
)
}

export default TeachersForm;