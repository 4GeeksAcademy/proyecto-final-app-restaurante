import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css"

const Login = () => {
    const nav = useNavigate();
    const { actions } = useContext(Context);
    const [user, setUser] = useState({ email: "", password: "" }); 

    const handleUser = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    };

    const redirect = user => {
        if(user.role=="Restaurant") {
            const restaurantId = user.restaurant.id;
            nav(`/restaurant/${restaurantId}`);
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
        actions.handleLogin(user)
        .then(response => response&&redirect(response.user));
    } 

    return (
        <div className="container login_page_main_container mt-5">
            <div className="bg-white border border-1 p-5 rounded-3 login_form_container col-12 col-sm-9 col-md-7 col-lg-6 col-lx-5">
                <div className="bg-danger login_title rounded-1"><strong>Login</strong></div>
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
                    <button type="submit" className="btn btn-success w-100 m-0 login_submit_button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;