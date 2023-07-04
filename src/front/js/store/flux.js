const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: { token: null, rol: null },
			BASEURL: process.env.BACKEND_URL
		},
		actions: {
			handleLogin: async (body /* previously "data" */) => {
				store = getStore();
				// console.log("logueando...")
				// console.log(data)

				// 1. que fetch funcione consultar "/api/login", en resumen, hacer login. Que responda con token si esta registrado
				// 

				// guardar el token en flux store y sessionStorage cuando el login sea exitoso
				// usar setStore para guardar en storage

				// usar sessionStorage
				// usar try catch para exitoso y msj de error
				// if(user = "") 

				// let response = await fetch(`${store.BASEURL}/login`);
				// let data = await response.json()



				// //////////////////////////////////////////////////////////////////////////////////
				// in class, the proffesor added the following code to the registerUser function:
				// return response.status //also replaced the catch content with this same code


				// 	try {
				// 		let response = await fetch(`${process.env.BACKEND_URL}/login`, {
				// 			method: "POST",
				// 			headers: {
				// 				"Content-Type": "application/json",
				// 			},
				// 			body: JSON.stringify(body),
				// 		});

				// 		let data = await response.json();
				// 		setStore({
				// 			token: data.token
				// 		});

				// 		localStorage.setItem("token", data.token)
				// 		return response.status
				// 	} catch (error) {
				// 		console.log(error)
				// 	}
				// }
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
}

export default getState;
