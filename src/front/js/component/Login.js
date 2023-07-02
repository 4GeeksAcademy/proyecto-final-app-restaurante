import React, { useState, useEffect, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";

const Login = () => {
    // const { store, actions } = useContext(Context);
	// const [user, setUser] = useState();
	
    // const handleUser = (event) => {
	// 	setUser({...user,
    //         [event.target.name]:event.target.value
    //     })
	// };


    return(
        <div className="container-fluid login_page_main_container">
            <div className="login_form_container col-6">
                <div className="col-12 bg-danger login_title">Login</div>
                <form className="col-10 login_form">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" /* value={user.email} onChange={(event) => handleUser(event)} */ />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" /* value={user.password} onChange={(event) => handleUser(event)} */ />
                </div>
                <button type="submit" className="btn btn-success d-flex justify-self-center col-4 login_submit_button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;