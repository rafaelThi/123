import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg';
import studyIcon from '../../assets/images/icons/study.svg'
import giveclassesIcon from '../../assets/images/icons/give-classes.svg'
import landingImg from '../../assets/images/landing.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import "./styles.css";
import api from "../../server/api";


function Landing() {

    const [totalConnections, setTotalConnection] = useState(0); 

    useEffect(()=>{ 
        api.get('connections').then(response=>{
            const {total} = response.data;

            setTotalConnection(total)
        })
     }, [] )

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Poffys"/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>

                    <img src={landingImg} alt="Plataforma de estudos" className="hero-image"/>

                <div className="buttons-container">

                    <Link to= "/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>Estudar
                    </Link>

                    <Link to= "/give-classes" className="give-classes">
                        <img src={giveclassesIcon} alt="Dar Aulas"/>Dar Aulas
                    </Link>

                </div>

                <span className="total-connections">
    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração Roxo"/>
                </span>
            </div>
        </div>
    )
}

export default Landing;