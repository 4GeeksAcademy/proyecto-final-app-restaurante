import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import "../../styles/requestCard.css"
import { Context } from "../store/appContext";

export const RequestCard = ({ key, user }) => {

    const [request, setRequest] = useState(false)
    const { restaurant } = user
    const { store, actions } = useContext(Context)

    const sendRequest = (response) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('status', response);
        formData.append('user_id', restaurant?.user_id);
        formData.append('email', user?.email);

        actions.manageRequest(formData)
    }

    return (
        // <div className="container d-flex justify-content-center ">
        //     <div className="border border-dark border-2 rounded w-50 mt-3 bg-light">
        <div className="d-flex justify-content-center">
            <div className="card px-4 py-2 col-md-11 col-lg-6 m-2">
                <div className="ms-4 me-4 mb-2 mt-2">
                    <h2><strong>{restaurant?.name}</strong></h2>
                    <h5><FontAwesomeIcon icon={faAddressCard} className="me-2" />{restaurant?.rif}</h5>
                    <h5><FontAwesomeIcon icon={faPhone} className="me-2" />{restaurant?.phone}</h5>
                    <h5><FontAwesomeIcon icon={faLocationDot} className="me-2" /> <a href='${location}'> {restaurant?.location}</a> </h5>
                    <p className="">
                        {restaurant?.description}
                    </p>
                </div>
                <div className="m-3 d-flex justify-content-between">
                    <button
                        className="button--green--edit-dish w-50 me-1"
                        name="accept"
                        onClick={(e) => sendRequest('valid')}
                    >
                        Validar
                    </button>
                    <button className="button--red--edit-dish w-50 ms-1 text-white"
                        name="reject"
                        onClick={(e) => sendRequest('invalid')}
                    >
                        Rechazar
                    </button>
                </div>
            </div>

        </div>
    );
};