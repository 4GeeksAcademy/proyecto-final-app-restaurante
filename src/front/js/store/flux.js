const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: JSON.parse(sessionStorage.getItem("user")) || null,
			token: JSON.parse(sessionStorage.getItem("token")) || null,
			results: [],
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
				const store = getStore();
				console.log(store.token)
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/restaurant/food`, {
						method: "POST",
						headers: {
							Authorization: `Bearer ${store.token}` // Agrega el token en el encabezado Authorization
						  },
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
				const priceParameter = budget == '' ?  "price" : `price=${budget}`; 
				const descriptionParameter = food == '' ? "description" : `description=${food}`;
				const url = `${process.env.BACKEND_URL}/food?${descriptionParameter}&tag&${priceParameter}`;
				console.log(url);

				try {
					let response = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						}
					})
					let data = await response.json();
					if (response.ok) {
						// Guardar en el contexto los platos
						setStore(
							{
								"results": data
							}
						);
					}
					else {
						setStore(
							{
								"results": []
							}
						);
					}
				} catch (err) {
					console.log(err);
				}
			}
		},
	}
};

export default getState;
