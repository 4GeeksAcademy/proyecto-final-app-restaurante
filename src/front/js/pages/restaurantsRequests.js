import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/restaurantsRequests.css";
import { RequestCard } from "../component/requestCard.js";


export const RestaurantRequest = () => {
    const { store, actions } = useContext(Context)
	const { requests } = store;   
    const navigate = useNavigate();

    useEffect(() => {
        actions.getRequests();
    }, []);

    useEffect(() => {
        if(store.user.role != "Admin") navigate("/access-denied")
    })

    return (
        <>
            {requests.map((item, index) => {
                return (
                    <>
                            <RequestCard key={index} user={item} />
                    </>
                )}
            )}
        </>
    );
};




