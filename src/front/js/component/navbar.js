import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext.js';
import "../../styles/navbar.css"
import ComeconLogo from "../../img/comecon-logo.png"
import ComeconName from "../../img/comecon-nombre.png"
import {
  faClipboardList,
  faClipboardCheck,
  faUser,
  faBook,
  faBookOpen,
  faRightFromBracket,
  faHeart,
  faCommentsDollar
} from '@fortawesome/free-solid-svg-icons'
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
        <div className="container-fluid justify-content-between">
          <div>
            <Link to="/">
              <img className="logo--navbar" src={ComeconLogo} alt="comecon-logo" width="70px" />
            </Link>
          </div>
          <div>
            <Link to="/">
              <img className="logo--navbar" src={ComeconName} alt="comecon-name" position="relative" width="270px" />
            </Link>
          </div>

          <div className="d-flex">
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
              (user?.role == 'User' || (user?.role == 'Restaurant' && user?.status == 'invalid')) &&
              <>
                <div className="d-flex justify-content-beetwen">
                  <Link to={`/register-restaurant`} className="">
                    <button className="button--perfil m-1">
                      <span id="tooltipText">Quiero vender!</span>
                      <FontAwesomeIcon icon={faCommentsDollar} size="lg" />
                    </button>
                  </Link>
                  <button className='button--logout m-1' onClick={logOutHandler}>
                    <span id="tooltipText">logOut</span>
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                  </button>
                </div>
              </>
            }
            {
              (user?.role == 'Restaurant' && user?.status == 'valid') &&
              <>
                <div className="d-flex justify-content-beetwen">
                  <Link to={`/restaurant/${user?.restaurant?.id}`} className="">
                    {/* <img src={user?.avatar_url} alt="MDN" className="logo--navbar" /> */}
                    <button className="button--perfil m-1">
                      <span id="tooltipText">Perfil</span>
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    </button>
                  </Link>
                  <Link to={`/favorite/${user?.restaurant?.id}`} className="">
                    {/* <img src={user?.avatar_url} alt="MDN" className="logo--navbar" /> */}
                    <button className="button--favorito m-1">
                      <span id="tooltipText">Favoritos</span>
                      <FontAwesomeIcon icon={faHeart} size="lg" />
                    </button>
                  </Link>
                  <Link to="/restaurant/menu">
                    <button className="button--menu m-1">
                      <span id="tooltipText">Menú</span>
                      <FontAwesomeIcon icon={faBookOpen} size="lg" />
                      {/* <FontAwesomeIcon icon={faBook} size="xl" /> */}
                    </button>
                  </Link>
                  <button className='button--logout m-1' onClick={logOutHandler}>
                    <span id="tooltipText">logOut</span>
                    <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
                  </button>
                </div>
              </>
            }
            {
              user?.role == 'Admin' &&
              <>
                <Link to='/admin/restaurant'>
                  <button className="button--menu m-1">
                    <span id="tooltipText">Restaurants</span>
                    <FontAwesomeIcon icon={faClipboardList} size="lg" />
                  </button>
                </Link>
                <Link to="/requests">
                  <button className="button--perfil m-1">
                    <span id="tooltipText">Solicitudes</span>
                    <FontAwesomeIcon icon={faClipboardCheck} size="lg" />
                  </button>
                </Link>
                <button className='button--logout m-1' onClick={logOutHandler}>
                  <span id="tooltipText">LogOut</span>
                  <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
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
