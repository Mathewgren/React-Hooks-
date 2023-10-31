import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-bg navbar-expand-lg">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand text-light fs-2">
            Mathew-Restaurant
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light active mt-2 fs-5"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light active mt-2 fs-5"
                  to="sagatable"
                >
                  Saga
                </NavLink>
              </li>

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle text-light mt-2 fs-5"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hooks
                </a>
                <ul
                  className="dropdown-menu hooks"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to=""
                    >
                      UseReducer
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to=""
                    >
                      useContext
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light mt-2 fs-5"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hooks with API
                </a>
                <ul
                  className="dropdown-menu hooks"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="usestate-api"
                    >
                      useState-API
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="usereducer-api"
                    >
                      useReducer-API
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="usecontext-api"
                    >
                      useContext-API
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="usecontext-apiR"
                    >
                      useContext-API R
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light active mt-2 fs-5"
                  to="redux"
                >
                  Redux
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light mt-2 fs-5"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Games
                </a>
                <ul
                  className="dropdown-menu hooks"
                  aria-labelledby="navbarDropdown"
                >
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="cargame"
                    >
                      Cargame
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light active mt-2 fs-5"
                      to="game"
                    >
                      game
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
