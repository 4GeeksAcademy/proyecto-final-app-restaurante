import React, { useContext} from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { SearchBar } from "../component/searchBar.js";
import { DishCard } from "../component/dishCard.js";

export const Home = () => {

	const { store } = useContext(Context)
	const { results } = store;

	return (
		<>
			<div className="container-fluid">

				{/* BARRA DE BUSQUEDA: */}
				<div>
					<SearchBar />
				</div>

				{/* Muestra los platos */}
				<div className="d-flex justify-content-center px-0 m-0 mt-4">
<<<<<<< HEAD
					<div>
=======
					<div className="col-md-11 col-lg-8">
>>>>>>> 374ab93187d7bf30c98b71646e3045bddc622493
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