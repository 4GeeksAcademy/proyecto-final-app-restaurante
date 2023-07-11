import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { RestaurantCard } from "../component/restaurantCard.jsx";

export const ControlPanel = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 0,
      businessName: "Juan",
      rif: "13296624",
      phone: "2525343",
      location: "khkjhkhk",
    },
    {
      id: 1,
      businessName: "Andres",
      rif: "1234567",
      phone: "2525343",
      location: "khkjhkhk",
    },
    {
      id: 2,
      businessName: "Kelvin",
      rif: "0987655",
      phone: "2525343",
      location: "khkjhkhk",
    },
  ]);

   

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="text-center text-white rounded-1 title">
            Control Panel
          </h2>
        </div>

        {restaurants.map((restaurant, index) => {
          console.log(restaurant);
          return <RestaurantCard key={index} restaurant={restaurant} />;
        })}
        
      </div>
    </>
  );
};

