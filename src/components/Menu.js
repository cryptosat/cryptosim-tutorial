import React from "react";
import { Link, matchPath, withRouter } from "react-router-dom";
import "./Menu.css";
import plan from "./lessons/plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/pro-light-svg-icons";
import logo from "./cryptosat_logo.svg";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.navigate = this.navigate.bind(this);
  }

  navigate(lesson) {
    this.props.history.push(lesson.path);
  }

  render() {
    const items = [];
    for (const section of Object.values(plan)) {
      items.push(
        <li key={section.name} className="section">
          {section.name}
        </li>
      );
      for (const lesson of section.lessons) {
        // TODO: replace key with unique path
        let elem = null;
        if (lesson.disabled) {
          elem = (
            <li key={lesson.path}>
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

    return (
      <>
        <div id="sideMenu">
          <div className="navbar">
            <div className="title-container">
              <Link to={href}>
                <img src={logo} alt="" />
                CryptoSat Simulator
              </Link>
            </div>
          </div>
          <ul>{items}</ul>
        </div>
      </>
    );
  }
}

export default withRouter(Menu);
