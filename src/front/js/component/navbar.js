import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext.js';
import "../../styles/index.css"
import ComeconLogo from "../../img/comecon-logo.png"
import ComeconName from "../../img/comecon-nombre.png"
import { faUser, faBook, faBookOpen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const { user } = store;
  const { logOut } = actions;
  const navigate = useNavigate();

  const logOutHandler = () => {
    logOut();
    navigate("/");
  }

  //

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
                <div className="d-flex justify-content-beetwen">
                  <Link to={`/restaurant/${user?.restaurant?.id}`} className="">
                    {/* <img src={user?.avatar_url} alt="MDN" className="logo--navbar" /> */}
                    <button className="button--perfil m-1">
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    </button>
                  </Link>
                  <Link to="/restaurant/menu">
                    <button className="button--menu m-1">
                      <FontAwesomeIcon icon={faBookOpen} size="lg" />
                      {/* <FontAwesomeIcon icon={faBook} size="xl" /> */}
                    </button>
                  </Link>
                  <button className='button--logout m-1' onClick={logOutHandler}>
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                  </button>
                </div>
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
