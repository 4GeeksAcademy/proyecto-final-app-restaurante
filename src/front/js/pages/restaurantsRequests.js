import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/restaurantsRequests.css";
import { RequestCard } from "../component/requestCard.js";


export const RestaurantRequest = () => {
    const { store, actions } = useContext(Context)
	const { requests } = store;   

    useEffect(() => {
        actions.getRequests();
    }, []);

    return (
        <>
            {requests.map((item, index) => {
                return (
                    <>
                        <RequestCard key={index} restaurant={item} />
                    </>
                )}
            )}
        </>
    );
};




