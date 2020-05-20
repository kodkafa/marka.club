import {inject, observer} from "mobx-react";
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import {SystemMessages} from './SystemMessages';
import {ImageViewer} from './ImageViewer';
import packageJson from '../../package.json';

export const Navbar = inject('AccountStore')(observer(props => {

  const {authenticated, me} = props.AccountStore
  const isShrink = props.className.indexOf('navbar-shrinked') > -1
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const ddToggle = (e) => {
    const dd = e.currentTarget;
    dd.classList.toggle('show');
    dd.querySelector('.dropdown-menu').classList.toggle('show');
  }

  const Shrink = (e, shrink) => {
    const navbar = document.getElementById('navbar');
    if (shrink || window.pageYOffset > 0) {
      navbar.classList.add("navbar-shrink");
    } else {
      navbar.classList.remove("navbar-shrink");
    }
  }

  if (!isShrink) {
    //Shrink(null, !!me.uid);
    window.addEventListener('scroll', Shrink);
  }


  const renderLogo = () => {
    return <Link to={me.uid ? "/dashboard" : "/"} className="navbar-brand" key="logo">
      {/*<img id="logo" src={logo} className="img-fluid" alt="logo"/>*/}
      <span>MARKA.CLUB</span>
      <span className="version">v{packageJson.version}</span>
    </Link>
  }

  const renderLinks = () => {
    if (authenticated) {
      return <React.Fragment>
        {me.id &&
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>}
        {(me.isManager || me.isAdmin) &&
        <li className="nav-item">
          <Link className="nav-link" to="/users">Users</Link>
        </li>}
      </React.Fragment>
    } else {
      return [<li className="nav-item" key="about">
        <HashLink smooth className="nav-link" to="/#about">About</HashLink>
      </li>,
        <li className="nav-item" key="features">
          <Link className="nav-link" to="/features">Features</Link>
        </li>];
    }
  }

  const renderUserMenu = () => {
    if (authenticated) {
      return [
        <li className="nav-item dropdown" key="userMenu" onClick={ddToggle}>
          <span className="nav-link dropdown-toggle" data-toggle="dropdown">
            <ImageViewer className="navbar-avatar"
                         src={me.avatar} alt={me.name}/>
            <i className={me.icon}/> <strong>{me.first}</strong>
          </span>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
            <Link className="dropdown-item" to="/profile">Profile</Link>
            <Link className="dropdown-item" to="/settings">Settings</Link>
            <div className="dropdown-divider"/>
            <Link className="dropdown-item" to="/signout">Log out</Link>
          </div>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key="signin">
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key="signup">
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }


  return (
    <nav id="navbar" className={"navbar navbar-expand-lg fixed-top " + props.className}>
      <div className="container">
        {renderLogo()}
        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggle}>
          <span className="navbar-toggler-icon"/>
        </button>

        <div className={"collapse navbar-collapse" + (isOpen ? ' show' : '')} id="navbarMain">
          <ul className="navbar-nav mr-auto">
            {renderLinks()}
          </ul>

          <ul className="nav navbar-nav navbar-right">
            {renderUserMenu()}
          </ul>
        </div>
      </div>
      <SystemMessages/>
    </nav>
  );
}));
