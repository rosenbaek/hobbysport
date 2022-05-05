import React, { useEffect } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.webp';
import { SignIn, SignOut } from './LoginComponents';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = (props) => {
  const [user] = useAuthState(props.auth);
  return (
    <nav className="w-full border-b-2 border-[rgb(201,25,46)] py-5">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between container mx-auto">
        <div className="flex-1">
          <img className="h-12" src={logo} alt="logo" />
        </div>

        <div className="flex justify-between text-lg ">
          <NavLink className="flex px-2 lg:px-5 items-center" to="/">
            Hjem
          </NavLink>
          <NavLink className="flex px-2 lg:px-5 items-center" to="/events">
            Events
          </NavLink>
          {user === null ? (
            <SignIn auth={props.auth} toast={props.toast} />
          ) : (
            <>
              <NavLink
                className="flex px-2 lg:px-5 items-center"
                to="/registerteam"
              >
                Opret Hold
              </NavLink>
              <SignOut auth={props.auth} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
