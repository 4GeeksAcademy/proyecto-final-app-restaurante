import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { RestaurantCard } from "../component/restaurantCard.jsx";
import { useNavigate } from "react-router-dom";

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
  const{store} = useContext(Context);
  const navigate = useNavigate();
  //TRAER TODOS LOS RESTAURANTS
  const getAllRestaurants = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/restaurant`);
      const data = await response.json();
      setRestaurants(data);

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
      {store.user?.role == "admin" ?
        <div className="container panel mt-4 p-4 bg-white border border-1 rounded-3">
          <div className="row justify-content-center">
            <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
              <strong>Control Panel</strong>
            </h2>
          </div>

          {restaurants.map((restaurant, index) => {
            console.log(restaurant);
            return <RestaurantCard key={index} restaurant={restaurant} />;
          })}
        </div> : navigate("/access_denied")
      }
    </>
  );
};