const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: { token: null, rol: null },
			BASEURL: process.env.BACKEND_URL
		},
		actions: {

			handleLogin: async (body /* previously "data" */) => {
				const store = getStore();
				// in class, the proffesor added the following code to the registerUser function:
				// return response.status //also replaced the catch content with this same code
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(body),
					});

					if (response.ok) {
						let data = await response.json();
						console.log(data);
						setStore({
							user: data
						});

						localStorage.setItem("user", data)

						return true;
					}

					setStore({
						user: { token: null, rol: null }
					});
					localStorage.setItem("user", null)

				} catch (error) {
					console.log(error)
				}
				return false;
			},
			//PARA REGISTRO DE RESTAURANT:
			restaurantRegister: async (user) => {
				console.log(user);
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/restaurant`, {
						method: "POST",
						body: user							//NO SE ENVIA HEADERS NI JSON.STRINGIFY XQ USAMOS FORMDATA
					})

					let data = await response.json();
					return data;

				} catch (error) {
					console.log(error);
				}

				return { 'message': 'Some error ocurred' };
			},
			//PARA REGISTRO DE DISHES:
			dishesRegister: async (user) => {
				console.log(user);
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/food/foodId`, {
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
			},
			// foodSearch: async (search) => {
			// 	let store = getStore()
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
		},
	}
};

export default getState;
