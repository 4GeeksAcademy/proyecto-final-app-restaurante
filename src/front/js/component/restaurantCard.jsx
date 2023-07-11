import React, { useState, useEffect, useContext } from "react";


const deleteRest = (index) => {
    const filteredRestaurant = restaurants.filter(restaurant => restaurant.index !== index) //ERROR RESTAURANT NOT DEFINED
    setRestaurants(filteredRestaurant)
}


export const RestaurantCard = ({key, restaurant}) => {
    const { id, businessName, rif, phone, location, index } = restaurant
    

    return (
        <div className="card border border-1 rounded-4 my-5" key={index}>
            <div className="card-body">
                <h5 className="card-title">{businessName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{rif}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
                <h6 className="card-subtitle mb-2 text-muted">{location}</h6>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success mx-4">More details</button>
                    <button className="btn btn-danger" onClick={() => deleteRest(restaurant.index)}>Delete</button>
                </div>
            </div>
        </div>
    )
}