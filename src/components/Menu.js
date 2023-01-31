import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css';
import plan from './lessons/plan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faTimes } from '@fortawesome/pro-light-svg-icons'

function getPathName(url) {
  let pathName = url.split('#').slice(-1)[0];
  if (pathName === '/') {
    pathName = plan[0].lessons[0].path;
  }
  return pathName;
}

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      currentLocation: '',
    }
  }

  closeMenu(e, currentLocation) {
    e.stopPropagation();
    this.props.setMenuVisible(false);
    if (currentLocation) {  
      this.setState({ currentLocation });
    }
  }

  componentDidMount() {
    this.setState({ currentLocation: getPathName(window.location.href) });
  }

 render() {
    const visibilityClass = this.props.visible ? 'show' : 'hide';
    const items = [];
    for (const section of Object.values(plan)) {
      items.push(<li key={section.name} className='section'>{section.name}</li>);
      for (const lesson of section.lessons) {
        // TODO: replace key with unique path
        let elem = null;
        if (lesson.disabled) {
          elem = (
            <li key={lesson.path}>
              <a href={lesson.path} className="disabled">{lesson.name}</a>
            </li>
          );
        } else {
          elem = (
            <li key={lesson.path}>
              <Link
                onClick={(e) => this.closeMenu(e, lesson.path)}
                to={lesson.path}
              >
                {lesson.path === this.state.currentLocation ? (
                  <FontAwesomeIcon icon={faChevronRight} className='active' />
                ) : null}
                {lesson.name}
              </Link>
            </li>
          );
        }
        items.push(elem);
      }
    }
    return (
      <>
        <div className={`backdrop ${visibilityClass}`} onClick={this.closeMenu}></div>
        <div id='sideMenu' className={visibilityClass}>
            <button onClick={this.closeMenu}>
              <FontAwesomeIcon icon={faTimes}/>
            </button>
          <ul>
            {items}
          </ul>
        </div>
      </>
    )
  }
}

export default Menu;



