const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

		},
		actions: {
			//PARA REGISTRAR UN USUARIO:
			restaurantRegister: async (user) => {
				console.log(user.get("restaurantName"));
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/restaurant`, {
						method: "POST",
						body: user							//NO SE ENVIA HEADERS NI JSON.STRINGIFY XQ USAMOS FORMDATA
					})

					console.log(response)

				} catch (error) {
					console.log(error);
				}
			},
			getOneRestaurant: async (id) => {
				//fetch to the api
				const response = await fetch(`${process.env.BACKEND_URL}/restaurant/${id}`)
				if (response.ok) {
					const restaurant = await response.json();
					return restaurant;
				}
				return null;
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
