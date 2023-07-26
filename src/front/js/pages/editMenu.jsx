import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { DishCard } from "../component/dishCard";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

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
<<<<<<< HEAD
  const [dishes, setDishes] = useState([]);
  const { store } = useContext(Context)
  const navigate = useNavigate();
  const { user } = store
=======
  // const [dishes, setDishes] = useState([]);
  const { store, actions } = useContext(Context);
  const { user, dishes, restaurant } = store;
  // const { user } = store
>>>>>>> 374ab93187d7bf30c98b71646e3045bddc622493



  //TRAER TODOS LOS PLATOS DE UN RESTAURANT
  // const getAllDishes = async (id) => {
  //   try {
  //     const response = await fetch(`${process.env.BACKEND_URL}/restaurant/${id}/food`);
  //     console.log(id)
  //     const data = await response.json();
  //     setDishes(data);

  //   } catch (err) {
  //     console.error(err);
  //   }
  //   console.log("showing dishes...")
  // };

  useEffect(() => {
    if (user != undefined && user.restaurant != undefined) {
      actions.getAllDishes(user.restaurant.id);
    }
  }, [user.index]);


  useEffect(() => {
    if(store.user.role != "Restaurant" && store.user.role != "Admin") navigate("/access-denied")
  })
  return (
    <>
<<<<<<< HEAD
        <><div className="panel container mt-4 p-4 bg-white border border-1 rounded-3">
          <div className="row justify-content-center">
            <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
              <strong>Editar Menú</strong>
            </h2>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Link to="/restaurant/menu/food"><button className="btn btn-success" type="button"><strong>Agregar plato</strong></button></Link>
            </div>
          </div>
        </div><div className="container col-12 px-0 m-0 mt-3">
            {dishes.map((dish, index) => {
=======
      <div className="panel container mt-4 p-4 bg-white border border-1 rounded-3">
        <div className="row justify-content-center">
          <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
            <strong>Editar Menú</strong>
          </h2>
          <div className="d-grid gap-2 d-md-flex justify-content-end">
            <Link to="/restaurant/menu/food"><button className="btn btn-success" type="button"><strong>Agregar plato</strong></button></Link>
          </div>
        </div>
        <div className="d-flex justify-content-center col-12 px-0 m-0 mt-3">
          <div className="col-md-12 col-lg-10 justify-content-center">
            {restaurant.foods.map((dish, index) => {
>>>>>>> 374ab93187d7bf30c98b71646e3045bddc622493
              console.log(dish);
              return <DishCard
                key={index}
                dish={dish} />;
            })}
<<<<<<< HEAD
          </div></>
=======
          </div>
        </div>
      </div>
>>>>>>> 374ab93187d7bf30c98b71646e3045bddc622493
    </>
  );
};
