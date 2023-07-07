import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css"
import ComeconLogo from "../../img/comecon-final-2.jpg"

export const Navbar = () => {
	return (
		<>
			<nav className="navbar">
				<div className="container">
					<img src={ComeconLogo}></img>
					<h1 className="text-light"> Comecon </h1>
					{/* <Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div> */}
					<div className="d-flex">
						<Link to = "/login"><button className="btn btn-light m-1">Login</button></Link>
						<Link to = "/register"><button className="btn btn-light m-1">Signup</button></Link>
					</div>
				</div>
			</nav>
			<div className="orange-line"></div>
		</>
	);
};
