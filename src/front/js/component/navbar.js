import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css"

export const Navbar = () => {
	return (
		<>
			<nav className="navbar">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div>
				</div>
			</nav>
			<div className="orange-line"></div>
		</>
	);
};
