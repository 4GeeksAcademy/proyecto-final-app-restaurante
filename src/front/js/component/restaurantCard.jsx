import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";



export const RestaurantCard = ({ key, restaurant }) => {
  const { actions } = useContext(Context);
  const { id, name, rif, phone, location, index } = restaurant


  return (
    <div class="d-flex justify-content-center">
      <div class="col-md-11 col-lg-6 m-2">
        <div class="card d-flex flex-wrap ">
          <div class="card-body">
            <h5 className="card-title"><strong>{name}</strong></h5>
            <h6 className="card-subtitle mb-2 text-muted">{rif}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{phone}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{location}</h6>
            <div className="d-flex justify-content-end">
              {/* <button className="btn btn-primary me-2"><strong>Edit</strong></button> */}
              <button className="btn btn-danger" onClick={() => actions.deleteRestaurant(restaurant.id)}><strong>Delete</strong></button>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}