import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { DishCardFavorite } from "../component/dishCardFavorite.js";
import { Link } from "react-router-dom";
import { Loader } from "../component/loader.jsx";


const initialState = [
    {
        image: "",
        restaurant: "",
        name: "",
        price: "",
        description: "",
    },
];

export const Favorites = () => {
    const { store, actions } = useContext(Context);
    const { user, favorites } = store;
    console.log(user)
    useEffect(() => {
        if (user != undefined && user?.restaurant != undefined) {
            actions.getAllDishes(user?.dish.id);
        }
    }, []);


    return (
        <>
            <Loader />
            <div className="panel container mt-4 p-4 bg-white border border-1 rounded-3">
                <div className="row justify-content-center">
                    <h2 className="text-center bg-danger p-2 text-white rounded-1 title fs-3">
                        <strong>Mis Favoritos</strong>
                    </h2>
                </div>
                <div className="d-flex justify-content-center col-12 px-0 m-0 mt-3">
                    <div className="col-md-12 col-lg-10 justify-content-center">
                        {favorites.map((dish, index) => {
                            console.log(dish);
                            return <DishCardFavorite
                                key={index}
                                dish={dish} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
