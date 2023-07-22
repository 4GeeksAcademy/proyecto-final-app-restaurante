import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import "../../styles/dishcard.css"
import { Context } from "../store/appContext";

export const RequestCard = ({ key, user }) => {

    // const [locationState, setLocationState] = useState(true);
    // const [phoneState, setPhoneState] = useState(true);
    // const [rifState, setRifState] = useState(true);

    // const handleCheckboxChange = ({target}) => {
    //     if (target.name === "location") {
    //         setLocationState(!checkbox1);
    //     } else if (target.name === "phone") {
    //         setPhoneState(!checkbox2);
    //     } else if (target.name === "rif") {
    //         setRifState(!checkbox3);
    //     }
    // };

    const [request, setRequest] = useState(false)
    const { restaurant } = user
    const { store, actions } = useContext(Context)

    // const handleChange = ({ target }) => {
    //     console.log(target.value, target.name)

    //     setRequest({
    //         ...request,
    //         [target.name]: target.value
    //     })
    // }

    const sendRequest = (response) => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('status', response);
        formData.append('user_id', user_id);
        formData.append('email', email);

        actions.manageRequest(formData)
    }

    return (
        <div className="container d-flex justify-content-center ">
            <div className="border border-dark border-2 rounded w-50 mt-3 bg-light">
                <div className="ms-4 me-4 mb-2 mt-2">
                    <h2>{restaurant?.name}</h2>
                    <h5><FontAwesomeIcon icon={faAddressCard} className="me-2" />{restaurant?.rif}</h5>
                    <h5><FontAwesomeIcon icon={faPhone} className="me-2" />{restaurant?.phone}</h5>
                    <h5><FontAwesomeIcon icon={faLocationDot} className="me-2" /> <a href='${location}'> {restaurant?.location}</a> </h5>
                    <p className="">
                        {restaurant?.description}
                    </p>
                </div>
                <form>
                    <div className=" m-3 d-flex justify-content-around">
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                name="location"
                            //checked={locationState}
                            //onChange={}
                            //value={request.location}
                            />
                            <label className="form-check-label" >
                                Ubicacion
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                isChecked
                                name="phone"
                            //onChange={}
                            //value={request.phone}
                            />
                            <label className="form-check-label">
                                Numero verificado
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                name="rif"
                            //onChange={}
                            //value={request.rif}
                            />
                            <label className="form-check-label">
                                RIF
                            </label>
                        </div>
                    </div>
                    <div className="m-3 d-flex justify-content-between">
                        <button
                            className="btn button-green w-50 me-1"
                            name="accept"
                            onClick={(e) => sendRequest('valid')}
                        >
                            Accept
                        </button>
                        <button className="btn button-orange w-50 ms-1"
                            name="reject"
                            onClick={(e) => sendRequest('invalid')}
                        >
                            Reject
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};