const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: JSON.parse(sessionStorage.getItem("user")) || null,
			token: JSON.parse(sessionStorage.getItem("token")) || null,
			BASEURL: process.env.BACKEND_URL
		},
		actions: {

			handleLogin: async (body) => {
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
						setStore({
							user: data.user,
							token: data.token
						});

						sessionStorage.setItem("user", JSON.stringify(data.user));
						sessionStorage.setItem("token", JSON.stringify(data.token));

						return data;
					}

					setStore({
						user: null,
						token: null
					});
					sessionStorage.setItem("user", null);
					sessionStorage.setItem("token", null);

				} catch (error) {
					console.log(error)
				}
				return null;
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
			dishesRegister: async (dish) => {
				console.log(dish);
				const store = getStore();
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/food/foodId`, {
						method: "POST",
						body: dish							//NO SE ENVIA HEADERS NI JSON.STRINGIFY XQ USAMOS FORMDATA
					})
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
			foodSearch: async (search) => {
				const { budget, food } = search;
				const url = `${process.env.BACKEND_URL}/food?description=${food}&tag=${food}&price=${budget}`;
				console.log(url);

				// try {
				// 	let response = await fetch(`${process.env.BACKEND_URL}/food/`, {
				// 		method: "GET",
				// 		headers: {
				// 			"Content-Type": "application/json",
				// 		},
				// 		body: JSON.stringify(search),
				// 	})
				// 	let data = await response.json();
				// 	//DEBERIA RETORNAR UN ARRAY DE OBJETOS CON LA COINCIDENCIA DE BUDGET Y FOOD
				// 	console.log(data);
				// } catch (err) {
				// 	console.log(err);
				// }
			}
		},
	}
};

export default getState;
