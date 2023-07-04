import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { onValidate } from "../util.js"

const initialState = {                                              //ESTADO INICIAL

    name: "",
    description: "",
    price: "",
    tag1: "",
    tag2: "",
    tag3: "",
    tag4: "",
    image_url: "",


}


export const AddDishes = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(initialState);                 //GUARDA ESTADO INICIAL
    const [errors, setErrors] = useState({});                       //GUARDA ERRORES DE VALIDACION

    const handleChange = (e) => {                                   //MANEJA LOS CAMBIOS EN LOS FORM FIELDS
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {                                 //MANEJA EL ENVIO DEL FORM
        e.preventDefault()
        const err = onValidate(user)                                //MANEJA LOS ERRORS DE LAS VALIDACIONES
        console.log(err)
        setErrors(err)

        console.log(Object.keys(err).length);                       //IMPRESION DE QTY DE ERRORES EN EL FORMULARIO


        if (Object.keys(err).length === 0) {                            //SI NO HAY ERRORES...

            const formData = new FormData()                            //AGREGA Y ENVIA LOS VALORES DEL FORMULARIO

            formData.append("name", user.name);
            formData.append("description", user.description);
            formData.append("price", user.price);
            formData.append("tag1", user.tag1);
            formData.append("tag2", user.tag2);
            formData.append("tag3", user.tag3);
            formData.append("tag4", user.tag4);
            formData.append("image_url", user.image_url);

            const response = actions.restaurantRegister(formData);      //FUNCION FLUX

            console.log("Registrando el usuario...");

        }
    }

    return (
        <>
            {/* AGREGAR PLATOS */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <h2 className="text-center bg-danger text-white rounded-1">
                            <strong>Add Dishes</strong>
                        </h2>


                        <form className="needs-validation" noValidate onSubmit={handleRegister}>

                            <div className="form-group mt-4">
                                <label htmlFor="name">Dish Name</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="name"
                                    name="name"
                                    placeholder="Enter the name of your dish"
                                    onChange={handleChange}
                                    value={user.name}
                                    required
                                ></input>
                                {errors.name && <div className="alert p-0 m-0 bg-none text-danger">{errors.name}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="description"
                                    name="description"
                                    placeholder="Enter your business RIF"
                                    onChange={handleChange}
                                    value={user.description}
                                    required
                                ></input>
                                {errors.description && <div className="alert p-0 m-0 bg-none text-danger">{errors.description}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    placeholder="Enter business contact number"
                                    onChange={handleChange}
                                    value={user.price}
                                    required
                                ></input>
                                {errors.price && <div className="alert p-0 m-0 bg-none text-danger">{errors.price}</div>}
                            </div>

                            <div className="container d-flex mt-3">
                                <label htmlFor="tag1">Tag 1:</label>
                                <select
                                    type="select"
                                    className="form-control"
                                    id="tag1"
                                    name="tag1"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={user.tag1}
                                    required
                                ></select>
                                {errors.tag1 && <div className="alert p-0 m-0 bg-none text-danger">{errors.tag1}</div>}

                                <label htmlFor="tag2">Tag 2:</label>
                                <select
                                    type="select"
                                    className="form-control"
                                    id="tag2"
                                    name="tag2"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={user.tag2}
                                    required
                                ></select>
                                {errors.tag2 && <div className="alert p-0 m-0 bg-none text-danger">{errors.tag2}</div>}

                                <label htmlFor="tag3">Tag 3:</label>
                                <select
                                    type="select"
                                    className="form-control"
                                    id="tag3"
                                    name="tag3"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={user.tag3}
                                    required
                                ></select>
                                {errors.tag3 && <div className="alert p-0 m-0 bg-none text-danger">{errors.tag3}</div>}

                                <label htmlFor="tag4">Tag 4:</label>
                                <select
                                    type="select"
                                    className="form-control"
                                    id="tag4"
                                    name="tag4"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={user.tag4}
                                    required
                                ></select>
                                {errors.tag4 && <div className="alert p-0 m-0 bg-none text-danger">{errors.tag4}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="image_url">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image_url"
                                    name="image_url"
                                    placeholder="https://..."
                                    onChange={handleChange}
                                    value={user.image_url}
                                    required
                                ></input>
                                {errors.image_url && <div className="alert p-0 m-0 bg-none text-danger">{errors.image_url}</div>}
                            </div>


                            {/* BOTON DE ENVIO */}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success text-white w-100 mt-3"
                                    onClick={(e) => handleRegister(e)}
                                >
                                    Save Dish
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};




