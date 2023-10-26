import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.css";
import logo from "./cryptosat_logo.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/pro-light-svg-icons";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e) {
    e.stopPropagation();
    if (this.props.toggleMenu) this.props.toggleMenu();
  }

  render() {
    const href = "/";

    return (
        <>
          <div className="navbar">
            <div className="actions-container">
              <button onClick={this.toggleMenu}>
                <FontAwesomeIcon size="lg" color="white" icon={faBars}/>
              </button>
            </div>
            <div className="title-container">
              <Link to={href}>
                <img src={logo} alt=""/>
                CryptoSat Simulator
              </Link>
            </div>
            <div className="actions-container">
            </div>
          </div>
        </>
    );
  }
}

export default NavBar;
