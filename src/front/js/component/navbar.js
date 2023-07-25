import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext.js';
import "../../styles/index.css"
import ComeconLogo from "../../img/comecon-logo.png"
import ComeconName from "../../img/comecon-nombre.png"
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

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

          <div className="d-fle</strong>x">
            {
              user == null &&
              <>
                <Link to="/login">
                  <button className="button--perfil m-1">
                    <strong>Ingresar</strong> 
                  </button>
                </Link>
                <Link to="/register">
                  <button className="button--menu m-1">
                  <strong>Regístrarse</strong>
                  </button>
                </Link>
              </>
            }
            {
              user?.role == 'Restaurant' &&
              <>
                <Link to={`/restaurant/${user?.restaurant?.id}`}>
                  <button className="button--perfil m-1">
                    <FontAwesomeIcon icon={faUser} className="me-2"/>
                    {store.restaurant?.name}
                  </button>
                </Link>
                <Link to="/restaurant/menu">
                  <button className="button--menu m-1">
                   Menú
                  </button>
                </Link>
                <button className='button--logout m-1' onClick={logOutHandler}>
                  <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
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
