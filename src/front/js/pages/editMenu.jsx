import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { DishCard } from "../component/dishCard";
import { Link } from "react-router-dom";

const initialState = [
  {
    // id: number,
    image: "",
    restaurant: "",
    name: "",
    price: "",
    description: "",
  },
];

export const EditMenu = () => {
  const [dishes, setDishes] = useState([]);
  const { store } = useContext(Context)

  const { user } = store



  //TRAER TODOS LOS PLATOS DE UN RESTAURANT
  const getAllDishes = async (id) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/restaurant/${id}/food`);
      console.log(id)
      const data = await response.json();
      setDishes(data);

    } catch (err) {
      console.error(err);
    }
    console.log("showing dishes...")
  };

  useEffect(() => {
    if (user != undefined && user.restaurant != undefined) {
      getAllDishes(user.restaurant.id);
    }
  }, []);


  return (
    <>
      <div className="panel container mt-4 p-4 bg-white border border-1 rounded-3">
        <div className="row justify-content-center">
          <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
            <strong>Editar Menú</strong>
          </h2>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to="/restaurant/menu/food"><button className="btn btn-success" type="button"><strong>Agregar plato</strong></button></Link>
          </div>
        </div>

        {dishes.map((dish, index) => {
          console.log(dish);
          return <DishCard key={index} dish={dish} />;
        })}
      </div>
    </>
  );
};
