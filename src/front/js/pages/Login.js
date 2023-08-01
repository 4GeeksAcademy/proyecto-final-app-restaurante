import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Loader } from "../component/loader.jsx";
import "../../styles/login.css"

const Login = () => {
    const nav = useNavigate();
    const { actions } = useContext(Context);
    const [user, setUser] = useState({ email: "", password: "" });

    const handleUser = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    };

    const redirect = user => {
        if (user.role == "Restaurant") {
            const restaurantId = user.restaurant.id;
            nav(`/restaurant/${restaurantId}`);
        }
        else if (user.role == 'Admin') {
            nav('/admin/restaurant');
        }
        else if (user.role == 'User') {
            nav('/');
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
        actions.handleLogin(user)
            .then(response => response && redirect(response.user));
    }

    return (
        <>
            <Loader />

            <div className="container login_page_main_container mt-5">
                <div className="bg-white border border-1 p-5 rounded-3 login_form_container">
                    <div className="text-center bg-danger p-2 text-white rounded-1 title fs-3"><strong>Login</strong></div>
                    <form className="login_form" onSubmit={handleLogin}>
                        <div className="mt-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={(event) => handleUser(event)} />
                        </div>
                        <div className="my-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={(event) => handleUser(event)} />
                        </div>
                        <div>
                            <button type="submit" className="w-100 m-0 button--login-register"><strong>Ingresa!</strong></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;