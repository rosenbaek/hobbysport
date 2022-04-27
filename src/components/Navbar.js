import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.webp";

const Navbar = () => {
	return (
		<nav className="flex justify-between bg-slate-200">
			<div className="flex-1">
				<img className="h-12" src={logo} />
			</div>

			<div className="flex justify-between ">
				<NavLink className="px-5" exact={true} to="/">
					Home
				</NavLink>

				<NavLink className="px-5" exact={true} to="/protected">
					Protected
				</NavLink>

				<NavLink className="px-5" to="/login">
					Login
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
