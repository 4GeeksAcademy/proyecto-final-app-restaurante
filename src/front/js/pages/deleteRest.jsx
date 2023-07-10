import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { RestCard } from "../component/RestCard.jsx";


export const DeleteRest = () => {

    return (
        <>
            <div>
                <RestCard />
            </div>
        </>

    )
};

