import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { SearchBar } from "../component/searchBar.js";
import { DishCard } from "../component/dishCard.js";
import { Loader } from "../component/loader.jsx";
import "../../styles/home.css";
import "../../styles/loader.css";


export const Home = () => {

	const { store } = useContext(Context)
	const { results } = store;

	return (
		<>
			<Loader />
			<div className="container-fluid">

				{/* BARRA DE BUSQUEDA: */}
				<div>
					<SearchBar />
				</div>

				{/* Muestra los platos */}
				<div className="d-flex justify-content-center px-0 m-0 mt-4">
					<div className="col-md-11 col-lg-8">
						{
							results.map(dish => {
								return (
									<DishCard
										key={dish.id}
										dish={dish} />
								);
							})
						}
					</div>
				</div>
			</div>
		</>

	);
};

export default Home;