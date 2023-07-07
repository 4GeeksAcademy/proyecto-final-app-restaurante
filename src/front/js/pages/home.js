import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

import { SearchBar } from "../component/searchBar.js";
import { DishCard } from "../component/dishCard.js";

export const Home = () => {

	const { actions, store } = useContext(Context)

	return (
		<>
			<div className="container-fluid">

				{/* BARRA DE BUSQUEDA: */}
				<SearchBar />

				{/* TARJETA PLATO*/}
				<DishCard />

			</div>
		</>

	);
};

export default Home;