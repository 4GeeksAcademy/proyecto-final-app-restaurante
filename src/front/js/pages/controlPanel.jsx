import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { RestaurantCard } from "../component/restaurantCard.jsx";

const initialState = [
  {
    // id: number,
    name: "",
    rif: "",
    phone: "",
    location: "",
  },
];

export const ControlPanel = () => {
  const [restaurants, setRestaurants] = useState([]);

  //TRAER TODOS LOS RESTAURANTS
  const getAllRestaurants = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/restaurant`);
      const data = await response.json();
      setRestaurants (data);

    } catch (err) {
      console.error(err);
    }
    console.log("showing restaurants...")
  };

    useEffect(() => {
      getAllRestaurants();
    }, []);


  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="text-center bg-danger text-white rounded-1 title">
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
