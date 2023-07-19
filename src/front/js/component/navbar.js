import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/index.css"
import ComeconLogo from "../../img/comecon-logo.png"
import ComeconName from "../../img/comecon-nombre.png"


export const Navbar = () => {
	const location = useLocation();
	return (
		<>
			<nav className="navbar p-0">
				<div className="container">
					<Link to="/"><img src={ComeconLogo} alt="comecon-logo" position="fixed" width="100px"></img></Link>
					<Link to="/"><img src={ComeconName} alt="comecon-logo" position="fixed" width="270px"></img></Link>
					
					{location.pathname === '/' && (
						<div className="d-fle</strong>x">
							<Link to="/login"><button className="btn btn-success m-1"><strong>Login</strong></button></Link>
							<Link to="/register"><button className="btn btn-warning m-1"><strong>Regístrate</strong></button></Link>
						</div>)}
				</div>
			</nav>
			<div className="orange-line"></div>
		</>
	);
};
