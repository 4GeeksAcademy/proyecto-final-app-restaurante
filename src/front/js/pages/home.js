import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import { Register } from "./register.jsx";
import { SearchBar } from "../component/searchBar.js";
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
				<Register />




			</div>
		</>
	);
};

export default Home;