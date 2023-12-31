import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate} from "react-router-dom";
import "../../styles/home.css";
import "../../styles/restaurantsRequests.css";
import { RequestCard } from "../component/requestCard.js";
import { Loader } from "../component/loader.jsx";



export const RestaurantRequest = () => {
    const { store, actions } = useContext(Context)
    const { requests } = store;
    const navigate  = useNavigate()
    useEffect(() => {
        if (store.user == null || store.user.role == "User" || store.user.role == "Restaurant") {
            navigate("/access-denied")
        }else{
            actions.getRequests();
        }
    }, []);

    return (
        <>
            <Loader />
            <div className="container panel mt-4 p-4 bg-white border border-1 rounded-3">
                <div className="row justify-content-center">
                    <h2 className="text-center bg-danger p-2 text-white rounded-1 title fs-3">
                        Solicitud de Restaurants
                    </h2>
                </div>
                <div className="d-flex justify-content-center px-0 m-0 mt-4">
                    <div className="col-md-11 col-lg-10">
                        {requests.map((item, index) => {
                            return (
                                <>
                                    <RequestCard key={index} user={item} />
                                </>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};




