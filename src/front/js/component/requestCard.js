import React, { useContext, useState } from "react";
import "../../styles/dishcard.css"

export const RequestCard = ({name, phone, rif, location, description}) => {

    const [resquest, setRequest] = useState()

    const handleRequest = (e) => {
        console.log(e.target.name)
    }

    return (
        <div className="container d-flex justify-content-center">

            <div className="border border-dark border-2 rounded w-50 mt-3">
                <div className="ms-4 me-4 mb-2 mt-2">
                    <h2>Business Name {name}</h2>
                    <h5>J6515616516 {rif}</h5>
                    <h5>0212-2122654 {phone}</h5>
                    <a href="">Ubicacion {location}</a>
                    <p className="">
                        Business es un restaiurante de comida asiatica con fusion latina que destaca por su pizza 
                        {description}
                    </p>
                </div>
                <form>
                    <div className=" m-3 d-flex justify-content-around">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    Ubicacion
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    Numero verificado
                                </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    RIF
                                </label>
                        </div>
                    </div>
                    <div className="m-3 d-flex justify-content-between">
                        <button 
                            className="btn button-green w-50 me-1"
                            name="accept"
                            onClick={(e) => handleRequest(e)}
                        >
                            Accept
                        </button>
                        <button className="btn button-orange w-50 ms-1">
                            Reject
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};