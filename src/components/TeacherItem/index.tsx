import React from 'react';
import whatsapp from "../../assets/images/icons/whatsapp.svg"
import "./styles.css"
import api from '../../server/api';


export interface Teacher{
    id:number;
    avatar:string;
    bio:string;
    cost:number;
    name: string;
    subject:string;
    whatsapp:string;
}

interface TeacherItemProps{
proffy: Teacher;
}



const  TeacherItem: React.FC<TeacherItemProps> = ({proffy}) => {
    function createNewConnection() {
        api.post('connections',{user_id:proffy.id})
    }
   
    return(
        <article className="teacher-item">
                    <header>
                        <img src={proffy.avatar} alt="Diego"/>
                        <div>
                            <strong>{proffy.name}</strong>
                            <span>{proffy.subject}</span>
                        </div>
                    </header>
                        <p>
                       {proffy.bio}
                        </p>

                        <footer>
                            <p>
                                Preço/hora
                                <strong>R${proffy.cost},00</strong>
                            </p>
                            <a target="_blank"
                            onClick={createNewConnection} 
                            href={`http://wa.me/+55${proffy.whatsapp}`}>
                                <img src={whatsapp} alt="whatsapp"/>Entar em Contato
                            </a>
                        </footer>
                
                </article>
    )
    
}

export default TeacherItem;