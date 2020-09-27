import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/">Home</Link>
            <Link className="navbar-brand" to="/interviews">List all Interviews</Link>
        </nav>
    );
}

export default NavBar;