import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { onValidateRegister } from "../util.js"

const initialState = {                                              //ESTADO INICIAL DEL FORM REGISTER

    restaurantName: "",
    restaurantRif: "",
    phone: "",
    email: "",
    location: "",
    password: "",

}


export const Register = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(initialState);                 //GUARDA ESTADO INICIAL DEL FORM REGISTER
    const [errors, setErrors] = useState({});                       //GUARDA ERRORES DE VALIDACION

    const handleChange = (e) => {                                   //MANEJA LOS CAMBIOS EN LOS CAMPOS DEL FORM REGISTER
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {                                 //MANEJA EL ENVIO DEL FORM REGISTER
        e.preventDefault()
        const err = onValidateRegister(user)                                //MANEJA LOS ERRORS DE LAS VALIDACIONES
        console.log(err)
        setErrors(err)

        console.log(Object.keys(err).length);                       //IMPRESION DE QTY DE ERRORES EN EL FORMULARIO


        if (Object.keys(err).length === 0) {                            //SI NO HAY ERRORES...

            const formData = new FormData()                            //AGREGA Y ENVIA LOS VALORES DEL FORMULARIO

            formData.append("restaurantName", user.restaurantName);
            formData.append("restaurantRif", user.restaurantRif);
            formData.append("restaurantPhone", user.phone);
            formData.append("restaurantLocation", user.location);
            formData.append("userEmail", user.email);
            formData.append("userPassword", user.password);

            const response = await actions.restaurantRegister(formData);      //FUNCION FLUX
            console.log(response);
        }
    }

    return (
        <>
            {/* FORMULARIO DE REGISTRO */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="bg-white border border-1 p-5 rounded-3 col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <h2 className="text-center bg-danger text-white rounded-1">
                            <strong>Create Account</strong>
                        </h2>


                        <form className="needs-validation" noValidate onSubmit={handleRegister}>

                            <div className="form-group mt-4">
                                <label htmlFor="restaurantName">Business Name</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="restaurantName"
                                    name="restaurantName"
                                    placeholder="Enter the name of your business here"
                                    onChange={handleChange}
                                    value={user.restaurantName}
                                    required
                                ></input>
                                {errors.restaurantName && <div className="alert p-0 m-0 bg-none text-danger">{errors.restaurantName}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="restaurantRif">R.I.F</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="restaurantRif"
                                    name="restaurantRif"
                                    placeholder="Enter your business RIF"
                                    onChange={handleChange}
                                    value={user.restaurantRif}
                                    required
                                ></input>
                                {errors.restaurantRif && <div className="alert p-0 m-0 bg-none text-danger">{errors.restaurantRif}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter business contact number"
                                    onChange={handleChange}
                                    value={user.phone}
                                    required
                                ></input>
                                {errors.phone && <div className="alert p-0 m-0 bg-none text-danger">{errors.phone}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                ></input>
                                {errors.email && <div className="alert p-0 m-0 bg-none text-danger">{errors.email}</div>}

                            </div>

                            <div className="form-group mt-4">
                                <label htmlFor="location">Location Link</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    placeholder="https://..."
                                    onChange={handleChange}
                                    value={user.location}
                                    required
                                ></input>
                                {errors.location && <div className="alert p-0 m-0 bg-none text-danger">{errors.location}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Choose a password"
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                ></input>
                                {errors.password && <div className="alert p-0 m-0 bg-none text-danger">{errors.password}</div>}
                            </div>

                            {/* BOTON DE ENVIO */}
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-success text-white w-100 mt-3"
                                    onClick={(e) => handleRegister(e)}
                                >
                                    Join in
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};




