import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const NavbarD = () => {
  const [isActive, setisActive] = useState(false);
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('https://clownfish-app-wqiu8.ondigitalocean.app/logout');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar is-fullwidth" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/home" className="navbar-item">
          <span className="navbar-item"><strong>Plasticos GE</strong></span>
        </a>
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""} is-mobile`}
      >
        <div className="navbar-start">
          <a href="/home" className="navbar-item" style={{ textDecoration: 'none' }}>
            Home
          </a>

          <a href="/dashboard" className="navbar-item" style={{ textDecoration: 'none' }}>
            Dashboard
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Button onClick={Logout} variant="danger">Cerrar sesion</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarD;
