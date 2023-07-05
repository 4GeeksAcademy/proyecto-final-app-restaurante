import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Login from "../component/Login"
import EditProfile from "../component/EditProfile"

import { Register } from "./register.jsx";
import { SearchBar } from "../component/searchBar.js";
import { DishCard } from "../component/dishCard.js";
import { AddDishes } from "../component/addDishes.jsx";

// import { Context } from "../store/appContext.js";


export const Home = () => {

	const { actions, store } = useContext(Context)

	return (
		<>
			<div className="container-fluid">

				{/* BARRA DE BUSQUEDA: */}
				<SearchBar />

				{/* AGREGAR PLATOS*/}
				<AddDishes />

				{/* FORMULARIO DE REGISTRO*/}
				{/* <Register /> */}

				{/* TARJETA PLATO*/}
				<DishCard />

			</div>
		</>

	);
};

export default Home;