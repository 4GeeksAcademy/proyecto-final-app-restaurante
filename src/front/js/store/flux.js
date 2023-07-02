const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

		},
		actions: {
			getRestaurant: (id) => {
				//fetch to the api
				const restaurant = {
					"id": 1,
					"user_id": "user",
					"name": "El restaurant de andres",
					"rif": "a",
					"description": "this is a restaurant",
					"location": "www.location.com",
					"facebook_url": "facebook.com",
					"twitter_url": "twitter.com",
					"instagram_url": "instagram.com",
					"phone": "phone",
					"created_at": "02/07/2023",
					"updated_at": "02/07/2023"
				}

				return restaurant;
			}
			// Use getActions to call a function within a fuction

			// foodSearch: async (search) => {
			// 	let store = getStore()

			// 	try {
			// 		let response = await fetch("URL", {
			// 			method: "GET",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 			},
			// 			body: JSON.stringify(search),
			// 		})
			// 		let data = await response.json();
			// 		//DEBERIA RETORNAR UN ARRAY DE OBJETOS CON LA COINCIDENCIA DE BUDGET Y FOOD


			// 	} catch (err) {

			// 	}
			// }

		}
	};
};

export default getState;
