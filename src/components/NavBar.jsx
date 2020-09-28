import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to='#'>InterviewCreator</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/interviews">List Interviews</Link>
          <Link className="nav-item nav-link" to="/users">List Users</Link>
          <Link className="nav-item nav-link" to="/interviews/new">Create Interview</Link>
          <Link className="nav-item nav-link" to="/users/new">Create User</Link>
        </div>
      </div>
    </nav>
    );
}

export default NavBar;


