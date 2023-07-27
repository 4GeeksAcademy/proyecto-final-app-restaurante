import { useRef } from "react";
import { successAlert, errorAlert, warningAlert } from "../util";

const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      user: JSON.parse(sessionStorage.getItem("user")) || null,
      token: JSON.parse(sessionStorage.getItem("token")) || null,
      restaurant: JSON.parse(sessionStorage.getItem("restaurant")) || null,
      results: [],
      requests: [],
      dishes: [],
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
          let data = await response.json();

          if (response.ok) {
            setStore({
              user: data.user,
              token: data.token
            });

            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("token", JSON.stringify(data.token));

            successAlert('Loged successful');

            return data;
          }

          setStore({
            user: null,
            token: null
          });
          sessionStorage.setItem("user", null);
          sessionStorage.setItem("token", null);

          errorAlert(data.message);

        } catch (error) {
          console.log(error)
        }
        return null;
      },
      //PARA REGISTRO DE RESTAURANT:
      restaurantRegister: async (user) => {
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/restaurant`, {
            method: "POST",
            body: user,							//NO SE ENVIA HEADERS NI JSON.STRINGIFY XQ USAMOS FORMDATA
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          let data = await response.json();

          if (response.ok) {
            successAlert('Registed successful');
            return true;
          }
          else {
            errorAlert(data.message);
          }

          // return data;

        } catch (error) {
          errorAlert('Some error ocurred');
          console.log(error);
        }
        
        return false;

        // return { 'message': 'Some error ocurred' };
      },

      //PARA REGISTRO DE DISHES:
      dishesRegister: async (dish) => {
        const store = getStore();
        const actions = getActions();
        const { getOneRestaurant } = actions;

        try {
          let response = await fetch(`${process.env.BACKEND_URL}/restaurant/food`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${store.token}` // Agrega el token en el encabezado Authorization
            },
            body: dish
          })

          const data = await response.json();

          if (response.ok) {
            successAlert('Dish added');
            await getOneRestaurant(store.restaurant.id);
            return true;
          }
          else {
            errorAlert(data.message);
          }

        } catch (error) {
          errorAlert('Some error ocurred');
          console.log(error);
        }

        return false;
      },
      getOneRestaurant: async (id) => {
        //fetch to the api
        const response = await fetch(`${process.env.BACKEND_URL}/restaurant/${id}`)

        if (response.ok) {
          const restaurant = await response.json();

          setStore({
            'restaurant': restaurant
          });
          sessionStorage.setItem("restaurant", JSON.stringify(restaurant));

          return restaurant;
        }

        setStore({
          'restaurant': null
        });
        sessionStorage.setItem("restaurant", JSON.stringify(null));

        return null;
      },

      foodSearch: async (search) => {
        const { budget, food, tag } = search;
        const priceParameter = budget == '' ? "price" : `price=${budget}`;
        const descriptionParameter = food == '' ? "description" : `description=${food}`;
        const tagsParameter = tag == '' ? "tags" : `tags=${food}`;
        console.log(tagsParameter);
        const url = `${process.env.BACKEND_URL}/food?${descriptionParameter}&${tagsParameter}&${priceParameter}`;
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
      },
      changeAvatar: async form => {
        const { token } = getStore();

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/user/avatar`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: form
          });

          const data = await response.json();

          if (response.ok) {
            successAlert('Avatar changed successful');
          }
          else {
            errorAlert(data.message);
            return false;
          }
        }
        catch (error) {
          errorAlert('Some error ocurred');
          return false;
        }

        return true;
      },
      addRestaurantImage: async form => {
        const { token } = getStore();

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/restaurant/gallery`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: form
          });

          const data = await response.json();

          if (response.ok) {
            successAlert('Restaurant image added');
          }
          else {
            errorAlert(data.message);
            return false;
          }
        }
        catch (error) {
          errorAlert('Some error ocurred');
          console.log(error);
          return false;
        }

        return true;
      },

      //TRAER TODOS LOS RESTAURANTS
      getAllRestaurants: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/restaurant`);
          const restaurants = await response.json();
          return restaurants;

        } catch (err) {
          console.error(err);
        }
        console.log("showing restaurants...")
      },


      //BORRAR RESTAURANTE POR ID
      deleteRestaurant: async (id) => {
        const { token } = getStore();
        
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/restaurant/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();

          if (response.ok) {
            successAlert('Restaurant deleted');
          }
          else {
            errorAlert(data.message);
          }
          return data;

        } catch (error) {
          errorAlert('Some error ocurred.');
          console.log("deleting restaurant...");
          console.log(error);
        }
      },
      getRequests: async () => {
        const store = getStore()
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/user`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${store.token}`
            }
          })
          if (response.ok) {
            const restaurants = await response.json();
            const allRequests = restaurants.filter((item) => {
              return item.status == 'invalid'
            })
            setStore({ requests: allRequests })
          }
        } catch (error) {
          console.log(error)
        }
      },

      editRestaurant: async (data) => {
        const store = getStore();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/restaurant`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${store.token}`
            },
            body: data
          });
          if (!response.ok) {
            errorAlert(data.message);
          }
          else {
            successAlert('Restaurant edited');
            return true;
          }
        } catch (error) {
          console.error(error);
        }
        return false;
      },

      deletePlaceImage: async (imageId, restaurantId = null) => {
        const store = getStore();

        const url = restaurantId == null
          ? `${process.env.BACKEND_URL}/restaurant/gallery/${imageId}`
          : `${process.env.BACKEND_URL}/restaurant/${restaurantId}/gallery/${imageId}`;

        try {
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${store.token}`
            },
          });
          const data = await response.json();

          if (response.ok) {
            successAlert('Place image deleted');
          }
          else {
            errorAlert(data.message);
            return false;
          }
        }
        catch (error) {
          errorAlert('some error ocurred');
          console.log(error);
          return false;
        }

        return true;
      },

      validateAdmin: async (specialToken, userData) => {
        console.log(userData);

        const response = await fetch(`${process.env.BACKEND_URL}/self-register-admin`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${specialToken}`
          },
          body: userData
        });

        const data = await response.json();

        if (response.ok) {
          successAlert('You have validated your account successful')
          console.log(data.message);
          return true;
        }

        console.log(response.message);
        return false;

      },
      editDish: async (data, id) => {
        const store = getStore();
        const actions = getActions();
        const { getOneRestaurant } = actions;

        try {
          let response = await fetch(`${process.env.BACKEND_URL}/restaurant/food/${id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${store.token}`
            },
            body: data
          });

          if (!response.ok) {
            errorAlert(data.message);
            console.log("No se pudo editar el plato")
          }
          else {
            successAlert('Plato editado correctamente');
            await getOneRestaurant(store.restaurant.id);
            return true;
          }
        } catch (error) {
          console.error(error);
        }

        return false;
      },


      deleteDish: async (id) => {
        const store = getStore();
        const actions = getActions();
        const { getOneRestaurant } = actions;
        const { restaurant } = store;

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/restaurant/food/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${store.token}`
            },
          });
          const data = await response.json();

          if (response.ok) {
            successAlert('Tu plato ha sido eliminado');
            await getOneRestaurant(restaurant.id);
          }
          else {
            errorAlert(data.message);
          }
          return data;

        } catch (error) {
          errorAlert('Un error ha ocurrido!');
          console.log(error)
        }
      },

      manageRequest: async (form) => {
        const store = getStore();
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/user/${form.get('user_id')}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${store.token}`
            },
            body: form
          });

          if (response.ok) {
            if (form.get('status') === 'valid')
              successAlert('Restaurante aceptado');
            else
              warningAlert('Restaurante rechazado')
          } else {
            errorAlert(data.message);
          }
        } catch (error) {
          console.error(error);
        }
      },
      clearResults: () => {
        setStore({
          results: []
        })
      },
      logOut: () => {
        setStore({
          user: null,
          restaurant: null,
          token: null
        });
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('restaurant');
      },

      getAllDishes: async (id) => {
        const store = getStore();

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/restaurant/${id}/food`);
          console.log(id)
          const data = await response.json();
          setStore(
            {
              "dishes": data
            }
          );    
        } catch (err) {
          console.error(err);
        }
        console.log("showing dishes...")
      } 
    }
  };
}

export default getState;
