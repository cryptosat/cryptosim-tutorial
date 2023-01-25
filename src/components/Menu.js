import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css';
import plan from './lessons/plan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-light-svg-icons'


class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.closeMenu = this.closeMenu.bind(this);
  }

  closeMenu(e) {
    e.stopPropagation();
    this.props.setMenuVisible(false);
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
              <Link onClick={this.closeMenu} to={lesson.path}>{lesson.name}</Link>
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



