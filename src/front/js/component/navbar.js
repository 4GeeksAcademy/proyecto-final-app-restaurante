import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext.js';
import "../../styles/index.css"
import ComeconLogo from "../../img/comecon-logo.png"
import ComeconName from "../../img/comecon-nombre.png"


export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { user } = store;
  const { logOut } = actions;
  const navigate = useNavigate();

  const logOutHandler = () => {
    logOut();
    navigate("/");
  }

  return (
    <>
      <nav className="navbar p-0">
        <div className="container">
          <Link to="/">
            <img src={ComeconLogo} alt="comecon-logo" position="fixed" width="100px" />
          </Link>
          <Link to="/">
            <img src={ComeconName} alt="comecon-logo" position="fixed" width="270px" />
          </Link>

<<<<<<< HEAD
          <div className="d-fle</strong>x">
=======
          <div className="d-flex">
>>>>>>> 374ab93187d7bf30c98b71646e3045bddc622493
            {
              user == null &&
              <>
                <Link to="/login">
                  <button className="btn btn-success m-1">
                    <strong>Login</strong>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-warning m-1">
                    <strong>Regístrate</strong>
                  </button>
                </Link>
              </>
            }
            {
              user?.role == 'Restaurant' &&
              <>
                <Link to={`/restaurant/${user?.restaurant?.id}`}>
                  <button className="btn btn-success m-1">
                    <strong>Perfil</strong>
                  </button>
                </Link>
                <Link to="/restaurant/menu">
                  <button className="btn btn-success m-1">
                    <strong>Menu</strong>
                  </button>
                </Link>
                <button className='btn btn-danger m-1' onClick={logOutHandler}>
                  <strong>Log out</strong>
                </button>
              </>
            }
            {
              user?.role == 'Admin' &&
              <>
                <Link to='/admin/restaurant'>
                  <button className="btn btn-success m-1">
                    <strong>Restaurantes</strong>
                  </button>
                </Link>
                <Link to="/requests">
                  <button className="btn btn-success m-1">
                    <strong>Request</strong>
                  </button>
                </Link>
                <button className='btn btn-danger m-1' onClick={logOutHandler}>
                  <strong>Log out</strong>
                </button>
              </>
            }
          </div>
        </div>
      </nav>
      <div className="orange-line"></div>
    </>
  );
};
