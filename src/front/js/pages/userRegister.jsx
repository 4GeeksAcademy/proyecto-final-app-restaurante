import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { onValidateRegister, onValidateUserName } from "../util.js"

const initialState = {                                              //ESTADO INICIAL DEL FORM REGISTER
    username: "",
    email: "",
    password: "",
    status: "valid",
    role: "User"
}

export const UserRegister = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(initialState);                 //GUARDA ESTADO INICIAL DEL FORM REGISTER
    const [errors, setErrors] = useState({});                       //GUARDA ERRORES DE VALIDACION
    const navigate = useNavigate();

    const handleChange = (e) => {                                   //MANEJA LOS CAMBIOS EN LOS CAMPOS DEL FORM REGISTER
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {                                 //MANEJA EL ENVIO DEL FORM REGISTER
        e.preventDefault()
        const err = onValidateUserName(user)                                //MANEJA LOS ERRORS DE LAS VALIDACIONES
        console.log(err)
        setErrors(err)

        console.log(Object.keys(err).length);                       //IMPRESION DE QTY DE ERRORES EN EL FORMULARIO


        if (Object.keys(err).length === 0) {                            //SI NO HAY ERRORES...

            const formData = new FormData()                            //AGREGA Y ENVIA LOS VALORES DEL FORMULARIO

            formData.append("name", user.username);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("status", user.status);
            formData.append("role", user.role);

            const response = await actions.userRegister(formData);      //FUNCION FLUX
            
            if (response)
                navigate('/login');
        }
    }

    return (
        <>
            {/* FORMULARIO DE REGISTRO */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="bg-white panel border border-1 p-5 rounded-3 col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5 login_container">
                        <h2 className="text-center bg-danger text-white rounded-1">
                            <strong>Crea tu Cuenta!</strong>
                        </h2>

                        <form className="needs-validation" noValidate onSubmit={handleRegister}>

                            <div className="form-group mt-4">
                                <label htmlFor="username">Nombre de Usuario</label>
                                <input
                                    type="text"
                                    className="form-control border"
                                    id="username"
                                    name="username"
                                    placeholder="Ingresa un nombre de usuario válido"
                                    onChange={handleChange}
                                    value={user.username}
                                    required
                                ></input>
                                {errors.username && <div className="alert p-0 m-0 bg-none text-danger">{errors.username}</div>}
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="nombre@ejemplo.com"
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                ></input>
                                {errors.email && <div className="alert p-0 m-0 bg-none text-danger">{errors.email}</div>}

                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="...entre 8 y 20 caracteres..."
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                ></input>
                                {errors.password && <div className="alert p-0 m-0 bg-none text-danger">{errors.password}</div>}
                            </div>

                            {/* BOTON DE ENVIO */}
                            <div>
                                <button
                                    type="submit"
                                    className="button--login-register w-100 mt-3"
                                >
                                    <strong>Únete a nosotros!</strong>
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};

