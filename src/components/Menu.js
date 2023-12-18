import React from "react";
import { Link, matchPath, withRouter } from "react-router-dom";
import "./Menu.css";
import plan from "./lessons/plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/pro-light-svg-icons";
import logo from "./cryptosat_logo.svg";
import lightLogo from "./cryptosat_logo_light.svg";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  closeMenu = (e) => {
    e.stopPropagation();
    this.props.setMenuOpen(false);
  };

  navigate = (lesson) => {
    this.props.setMenuOpen(false);
    this.props.history.push(lesson.path);
  };

  setLanguage = (e) => {
    e.stopPropagation();
    const selectedLanguage = e.target.value;
    this.props.setLanguage(selectedLanguage);
  };

  setTheme = (e) => {
    e.stopPropagation();
    const selectedTheme = e.target.value;
    this.props.setTheme(selectedTheme);
  };

  render() {
    const sectionClass = 'section '+this.props.theme;
    const items = [];
    for (const section of Object.values(plan)) {
      items.push(
        <li key={section.name} className={sectionClass}>
          {section.name}
        </li>
      );
      for (const lesson of section.lessons) {
        // TODO: replace key with unique path
        let elem = null;
        if (lesson.disabled) {
          elem = (
            <li key={lesson.path} className={this.props.theme}>
              <a href={lesson.path} className="disabled">
                {lesson.name}
              </a>
            </li>
          );
        } else {
          elem = (
            <li key={lesson.path}>
              <a
                href={lesson.path}
                onClick={(e) => {
                  e.preventDefault();
                  this.navigate(lesson);
                }}
                className={this.props.theme}
              >
                {matchPath(lesson.path, {
                  path: this.props.location.pathname,
                  exact: true,
                }) && (
                  <FontAwesomeIcon icon={faChevronRight} className="active" />
                )}
                {lesson.name}
              </a>
            </li>
          );
        }
        items.push(elem);
      }
    }

    const href = "/";
    let visibilityClassName = this.props.isOpen ? "show" : "hide";
    if(this.props.theme === 'light') {
      visibilityClassName += ' light';
    }
    const linkClass = this.props.theme;

    return (
      <>
        <div
            className={`backdrop ${visibilityClassName}`}
            onClick={this.closeMenu}
        />
        <div id="sideMenu" className={visibilityClassName}>
          <div className="menu-title">
            <Link to={href} className={linkClass}>
              <img src={this.props.theme === 'light' ? lightLogo : logo} alt="" />
              Cryptosat Simulator
            </Link>
          </div>
          <ul>{items}</ul>
          <select name="language" onChange={this.setLanguage} value={this.props.language}>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select><br/><br/>
          <select name="theme" onChange={this.setTheme} value={this.props.theme}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </>
    );
  }
}

export default withRouter(Menu);
