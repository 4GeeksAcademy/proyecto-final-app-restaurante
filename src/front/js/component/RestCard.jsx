import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";


export const RestCard = ({ key, contact }) => {
    const { store, actions } = useContext(Context)

    const deleteContact = (id) => {
        actions.deleteContact(id);
    }

    return (
        <>
            <ul className="list-group border rounded-1">
                {/* TARJETA DE CONTACTO */}
                {store.contactList.map((contact) => (
                    <li className="list-group-item d-flex justify-content-between align-items-start" key={contact.id}>
                        <img src="https://avatars.githubusercontent.com/u/127767142?v=4"
                            className="rounded-circle"
                            alt="Perfil de Juan Ramos" />

                        <div className="ms-2 me-auto">
                            <ul>
                                <li className="fw-bold text-uppercase fs-5">{contact.full_name}</li>
                                <li><i className="fa-solid fa-location-dot"></i>{contact.address}</li>
                                <li><i className="fa-solid fa-phone"></i>{contact.phone}</li>
                                <li><i className="fa-solid fa-envelope"></i>{contact.email}</li>
                            </ul>
                        </div>

                        {/* ICONOS DE EDICION Y BORRAR */}
                        <span>
                            <Link to={`/home/${contact.id}`}>
                                <i className="fa-solid fa-pencil"></i>
                            </Link>
                            <i onClick={() => deleteContact(contact.id)} className="fa-solid fa-trash-can"></i>
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}