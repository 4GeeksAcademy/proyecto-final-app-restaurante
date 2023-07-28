import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { DishCard } from "../component/dishCard";
import { Link } from "react-router-dom";

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
    // const [dishes, setDishes] = useState([]);
    const { store, actions } = useContext(Context);
    const { user, dishes, restaurant } = store;
    // const { user } = store

    useEffect(() => {
        if (user != undefined && user.restaurant != undefined) {
            actions.getAllDishes(user.restaurant.id);
        }
    }, [user.index]);


    return (
        <>
            <div className="panel container mt-4 p-4 bg-white border border-1 rounded-3">
                <div className="row justify-content-center">
                    <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
                        <strong>Mis Favoritos</strong>
                    </h2>
                </div>
                <div className="d-flex justify-content-center col-12 px-0 m-0 mt-3">
                    <div className="col-md-12 col-lg-10 justify-content-center">
                        {restaurant.foods.map((dish, index) => {
                            console.log(dish);
                            return <DishCard
                                key={index}
                                dish={dish} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
