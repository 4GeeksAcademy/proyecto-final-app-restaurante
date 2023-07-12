import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

// const initialState = [
//   {
//     id: number,
//     name: "",
//     rif: "",
//     phone: "",
//     location: "",
//   },

// ]


export const RestaurantCard = ({ key, restaurant }) => {
  const { actions } = useContext(Context);
  const { id, name, rif, phone, location, index } = restaurant

  // const [restaurants, setRestaurants] = useState(initialState)               //DEFINIDO EN CONTROL PANEL

  return (
    <div className="card border border-1 rounded-4 my-5" key={index}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{rif}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
        <h6 className="card-subtitle mb-2 text-muted">{location}</h6>
        <div className="d-flex justify-content-end">
          <button className="btn btn-success mx-4">More details</button>
          <button className="btn btn-danger" onClick={() => actions.deleteRestaurant(restaurant.index)}>Delete</button>
        </div>
      </div>
    </div>
  )
}