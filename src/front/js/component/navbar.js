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
					{/* <Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div> */}
					{location.pathname === '/' && (
						<div className="d-flex">
							<Link to="/login"><button className="btn btn-light m-1">Login</button></Link>
							<Link to="/register"><button className="btn btn-light m-1">Signup</button></Link>
						</div>)}
				</div>
			</nav>
			<div className="orange-line"></div>
		</>
	);
};
