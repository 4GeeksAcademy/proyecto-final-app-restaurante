import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

import { SearchBar } from "../component/searchBar.js";
import { DeleteRest } from "../pages/deleteRest.jsx";
import { DishCard } from "../component/dishCard.js";
import { AddDishes } from "../component/addDishes.jsx";
import Login from "../component/Login.js";


export const Home = () => {

	const { store } = useContext(Context)
	const { results } = store;

	return (
		<>
			<div className="container-fluid">

				{/* BARRA DE BUSQUEDA: */}
				<SearchBar />

				<DeleteRest />

				<AddDishes/>

				<Login />

				{/* Muestra los platos */}
				{
					results.map( food => {
						return (
							<DishCard 
								key={food.id} 
								restaurant={food.restaurant_name} 
								name={food.name}
								description={food.description}
								price={food.price} 
								image={food.image_url} />
						);
					})
				}
			</div>
		</>

	);
};

export default Home;