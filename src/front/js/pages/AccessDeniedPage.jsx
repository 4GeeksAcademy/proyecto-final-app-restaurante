import React from "react";
import "../../styles/accessDeniedPage.css"
import { Link } from "react-router-dom";


const accessDeniedPage = () => {
    return(
        <div className="main_container container-fluid vh-100">
            <div className="message_container mt-5 text-center"> 
                <h1 className="mt-3">Acceso denegado</h1>
                <p>No tienes permiso para acceder a esta página.</p>
                <Link className="btn btn-link" to={"/"}>Volver al inicio</Link>
            </div>
        </div>
    )
}


export default accessDeniedPage;