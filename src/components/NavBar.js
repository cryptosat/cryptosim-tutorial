import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./cryptosat_logo.svg";
import Menu from "./Menu.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDoubleRight,
  faChevronDoubleLeft,
  faBug,
} from "@fortawesome/pro-light-svg-icons";

const BugButton = (props) => {
  return (
    <button className="bug-button" onClick={props.fileBug}>
      <FontAwesomeIcon icon={faBug} />
      &nbsp;REPORT BUG
    </button>
  );
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.fileBug = this.fileBug.bind(this);
    this.setMenuVisible = this.setMenuVisible.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.togglePanel = this.togglePanel.bind(this);
    this.state = {
      menuVisible: false,
      easterEgg: false,
    };

    window.document.addEventListener("keydown", (e) => {
      if (e.altKey && e.ctrlKey) {
        this.setState({
          easterEgg: true,
        });
      }
    });
  }

  setMenuVisible(visible) {
    this.setState({
      menuVisible: visible,
    });
  }

  toggleMenu(e) {
    e.stopPropagation();
    this.setMenuVisible(!this.state.menuVisible);
  }
  togglePanel(e) {
    e.stopPropagation();
    if (this.props.togglePanel) this.props.togglePanel();
  }

  fileBug(e) {
    e.stopPropagation();
    window.open("https://github.com/cryptosat/cryptosim-tutorial/issues/new");
  }

  render() {
    const href = this.state.easterEgg ? "/multisat" : "/";

    return (
      <>
        <BugButton fileBug={this.fileBug} />
        <Menu
          visible={this.state.menuVisible}
          setMenuVisible={this.setMenuVisible}
        />

        <div className="navbar">
          {this.props.isPannelCollapse ? (
            <div className="actions-container">
              <button onClick={this.togglePanel}>
                <FontAwesomeIcon
                  color="#686672"
                  size="lg"
                  icon={faChevronDoubleRight}
                />
              </button>
            </div>
          ) : (
            <>
              <div className="actions-container">
                <button onClick={this.toggleMenu}>
                  <FontAwesomeIcon size="lg" color="white" icon={faBars} />
                </button>
              </div>
              <div className="title-container">
                <Link to={href}>
                  <img src={logo} alt="" />
                  Cryptosat Simulator
                </Link>
              </div>
              <div className="actions-container">
                <button onClick={this.togglePanel}>
                  <FontAwesomeIcon
                    color="#686672"
                    size="lg"
                    icon={faChevronDoubleLeft}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default NavBar;
