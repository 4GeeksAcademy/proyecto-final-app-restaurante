import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { onValidateDishes } from "../util.js";

const initialState = {                                              //ESTADO INICIAL

    name: "",
    description: "",
    price: "",
    tags: "",
    image: "",
};

export const AddDishes = () => {
    const { actions } = useContext(Context);
    const [dish, setDish] = useState(initialState);                 //GUARDA ESTADO INICIAL
    const [errors, setErrors] = useState({});                       //GUARDA ERRORES DE VALIDACION

    const handleChange = (e) => {
        //MANEJA LOS CAMBIOS EN LOS FORM FIELDS
        setDish({ ...dish, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {                                 //MANEJA EL ENVIO DEL FORM
        e.preventDefault()
        const err = onValidateDishes(dish)                          //MANEJA LOS ERRORS DE LAS VALIDACIONES
        console.log(err)
        setErrors(err)                     //IMPRESION DE QTY DE ERRORES EN EL FORMULARIO

        if (Object.keys(err).length === 0) {                            //SI NO HAY ERRORES...

            const formData = new FormData();                            //AGREGA Y ENVIA LOS VALORES DEL FORMULARIO

            formData.append("foodName", dish.name);
            formData.append("foodDescription", dish.description);
            formData.append("foodPrice", dish.price);
            formData.append("foodTags", dish.tags);
            formData.append("image", dish.image);

            actions.dishesRegister(formData); //FUNCION FLUX
        };
    }

    return (
        <>
            {/* AGREGAR PLATOS */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="bg-white border border-1 rounded-4 p-5 col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <h2 className="text-center bg-danger text-white rounded-1">
                            <strong>Add Dishes</strong>
                        </h2>

                        <form
                            className="needs-validation"
                            noValidate
                            onSubmit={handleRegister}
                        >
                            <div className="form-group mt-4">
                                <label htmlFor="name">Dish Name</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="name"
                                    name="name"
                                    placeholder="Enter the name of your dish"
                                    onChange={handleChange}
                                    value={dish.name}
                                    required
                                ></input>
                                {errors.name && <div className="alert p-0 m-0 bg-none text-danger">{errors.name}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    placeholder="A brief description of your dish"
                                    onChange={handleChange}
                                    value={dish.description}
                                    required
                                ></textarea>
                                {errors.description && <div className="alert p-0 m-0 bg-none text-danger">{errors.description}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="name">Price</label>
                                <div className="input-group border rounded-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        aria-label="Amount (to the nearest dollar)"
                                        placeholder="Amount in dollars"
                                        onChange={handleChange}
                                        value={dish.price}
                                        required
                                    />
                                    <span className="input-group-text">$</span>
                                </div>
                                {errors.price && <div className="alert p-0 m-0 bg-none text-danger">{errors.price}</div>}

                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="name">Tags</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="tags"
                                    name="tags"
                                    placeholder="Enter some tags"
                                    onChange={handleChange}
                                    value={dish.tags}
                                    required
                                ></input>
                                {errors.tags && <div className="alert p-0 m-0 bg-none text-danger">{errors.tags}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="image" className="form-label">
                                    Image
                                </label>
                                <input
                                    className="form-control form-control-sm"
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={handleChange}
                                    value={dish.image}
                                    required
                                ></input>
                                {/* {errors.image && <div className="alert p-0 m-0 bg-none text-danger">{errors.image}</div>} */}
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
                </div>
            </div>
        </>
    );
};
