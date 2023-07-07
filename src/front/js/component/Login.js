import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css"

const Login = () => {
    const nav = useNavigate();
    const { actions } = useContext(Context);
    const [user, setUser] = useState({ email: "", password: "" }); 

    // maybe rename this function to "handleChange", that's how Deimian named it in class
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
        <div className="container-fluid login_page_main_container">
            <div className="login_form_container col-6">
                <div className="col-12 bg-danger login_title">Login</div>
                <form className="col-10 login_form" onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={(event) => handleUser(event)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={user.password} onChange={(event) => handleUser(event)} />
                    </div>
                    <button type="submit" className="btn btn-success col-4 login_submit_button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;