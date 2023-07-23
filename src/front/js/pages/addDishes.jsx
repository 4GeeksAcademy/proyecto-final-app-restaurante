import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
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
    const navigate = useNavigate();

    const handleChange = (e) => {
        //MANEJA LOS CAMBIOS EN LOS FORM FIELDS
        setDish({ ...dish, [e.target.name]: e.target.value });
    };

    const handleRegister = async(e) => {                                 //MANEJA EL ENVIO DEL FORM
        e.preventDefault()
        const err = onValidateDishes(dish)                          //MANEJA LOS ERRORS DE LAS VALIDACIONES
        setErrors(err)                                              //IMPRESION DE QTY DE ERRORES EN EL FORMULARIO

        if (Object.keys(err).length === 0) {                            //SI NO HAY ERRORES...

            const formData = new FormData();                            //AGREGA Y ENVIA LOS VALORES DEL FORMULARIO

            formData.append("foodName", dish.name);
            formData.append("foodDescription", dish.description);
            formData.append("foodPrice", dish.price);
            formData.append("foodTags", dish.tags);
            formData.append("image", dish.image);

            const success = await actions.dishesRegister(formData); //FUNCION FLUX

            if (success)
                navigate('/restaurant/menu');
        };
    }

    return (
        <>
            {/* AGREGAR PLATOS */}
            <div className="container panel mt-4 p-4 bg-white border border-1 rounded-3">
                <div className="row justify-content-center">
                    <h2 className="text-center bg-danger p-2 text-white rounded-1 title">
                        <strong>Agregar Plato</strong>
                    </h2>
                    <div className="mt-3 col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <form
                            className="needs-validation"
                            noValidate
                            onSubmit={handleRegister}
                        >
                            <div className="form-group mt-4">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    id="name"
                                    name="name"
                                    placeholder="Ingresa el nombre del plato"
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
                                    Descripción
                                </label>
                                <textarea
                                    className="form-control border border-dark"
                                    id="description"
                                    name="description"
                                    rows="3"
                                    placeholder="Una breve descripción de tu plato"
                                    onChange={handleChange}
                                    value={dish.description}
                                    required
                                ></textarea>
                                {errors.description && <div className="alert p-0 m-0 bg-none text-danger">{errors.description}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="name">Precio</label>
                                <div className="input-group border rounded-3">
                                    <input
                                        type="text"
                                        className="form-control border border-dark"
                                        id="price"
                                        name="price"
                                        aria-label="Amount (to the nearest dollar)"
                                        placeholder="Monto en dólares"
                                        onChange={handleChange}
                                        value={dish.price}
                                        required
                                    />
                                    <span className="input-group-text">$</span>
                                </div>
                                {errors.price && <div className="alert p-0 m-0 bg-none text-danger">{errors.price}</div>}

                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="name">Etiquetas</label>
                                <input
                                    type="text"
                                    className="form-control border border-dark"
                                    id="tags"
                                    name="tags"
                                    placeholder="Agrega algunas palabras claves"
                                    onChange={handleChange}
                                    value={dish.tags}
                                    required
                                ></input>
                                {errors.tags && <div className="alert p-0 m-0 bg-none text-danger">{errors.tags}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="image" className="form-label">
                                    Imagen
                                </label>
                                <input
                                    className="form-control form-control-sm border border-dark"
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={({ target }) => setDish({ ...dish, image: target.files[0] })}
                                    required
                                ></input>
                                {/* {errors.image && <div className="alert p-0 m-0 bg-none text-danger">{errors.image}</div>} */}
                            </div>

                            {/* BOTON DE ENVIO */}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success w-100 mt-3"
                                    onClick={(e) => handleRegister(e)}
                                >
                                    <strong>Guardar</strong>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
