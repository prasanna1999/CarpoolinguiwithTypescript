import React from 'react';
import './NavBar.scss';
import User from '../User';
import logo from 'D:/carpoolingui/src/Images/logo.png';
import { NavLink, Link, withRouter } from 'react-router-dom';

function NavBar(props: any) {
  function logout() {
    localStorage.setItem('Name', '');
    localStorage.setItem('Email', '');
    localStorage.setItem('PhoneNumber', '');
    localStorage.setItem('Id', '');
  }
  return (
    <div className="navbar">
      {localStorage.getItem('Name') == '' ? props.history.push('/signup') : ""}
      {localStorage.getItem('Name') == null ? props.history.push('/signup') : ""}
      {console.log(localStorage.getItem('Name'))}
      <div className="logo">
        <Link to="/ui/home"><img src={logo} /></Link>
      </div>
      <div className="profileinfo">
        <div className="profilename">{localStorage.getItem('Name')}</div>
        <div className="profilepic"><img src={logo} /></div>
        <div className="listitems">
          <NavLink activeClassName="active" className="item" to="/ui/profile"><div className="itemname">Profile</div></NavLink>
          <NavLink activeClassName="active" className="item" to="/ui/myrides"><div className="itemname">My Rides</div></NavLink>
          <NavLink activeClassName="active" className="item" to="/signup"><div className="itemname" onClick={logout}>Logout</div></NavLink>
        </div>
      </div>
    </div>
  );
}

export default withRouter(NavBar);