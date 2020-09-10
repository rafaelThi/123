import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';

import TeacherItem, {Teacher} from '../../components/TeacherItem';

import Input from "../../components/input"
import Select from '../../components/Select';
import api from '../../server/api';

import './styles.css';




function TeachersList() {

    const [teachers, setTeachers] = useState([])//aula 3

    const [subject, setsubject] = useState('');
    const [weekday, setweekday] = useState('');
    const [time, settime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();     

        const response = await api.get('classes', {
            params:{
                subject,
                weekday, 
                time,
            }
        })
        setTeachers( response.data)
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os Proffys disponíveis." >
               <form  id="search-teachers" onSubmit={searchTeachers}>
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
                />  <Select 
                name="weekday" 
                label= "Dia da Semana" 
                value={weekday} 
                onChange={(e)=>{ 
                    setweekday(e.target.value) 
                }}
                
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
                   <Input type="time" 
                   name="time" 
                   label="Hora"
                   value={time} 
                   onChange={(e)=>{ 
                       settime(e.target.value) 
                   }}
                   />
                
                <button type="submit">
                    Buscar
                </button>
                
               </form>
            </PageHeader>
            <main>
                   {teachers.map((teacher: Teacher)=>{
                       return   <TeacherItem key={teacher.id} proffy={teacher} />;
                   })}
                            
            </main>

        </div>
    )
}

export default TeachersList;