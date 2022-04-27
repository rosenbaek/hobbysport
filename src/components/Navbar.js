import React, { useEffect } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.webp";
import { SignIn, SignOut } from "./LoginComponents";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = (props) => {
	const [user] = useAuthState(props.auth);
	useEffect(() => {
		console.log(user);
	});
	return (
		<nav className="flex justify-between bg-slate-200">
			<div className="flex-1">
				<img className="h-12" src={logo} />
			</div>

			<div className="flex justify-between ">
				<NavLink className="flex px-5 items-center" exact={true} to="/">
					Home
				</NavLink>

				{user === null ? (
					<SignIn auth={props.auth} />
				) : (
					<>
						<NavLink
							className="flex px-5 items-center"
							exact={true}
							to="/protected"
						>
							Protected
						</NavLink>
						<SignOut auth={props.auth} />
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
