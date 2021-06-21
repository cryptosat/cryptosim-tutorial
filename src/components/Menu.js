import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css';
import plan from './lessons/plan';


class Menu extends React.Component {

 render() {
    const visibilityClass = this.props.visible ? 'show' : 'hide';
    const items = [];
    for (const section of Object.values(plan)) {
        // TODO: replace key with unique path
      items.push(<li key={Math.random()} className='section'>{section.name}</li>);
      for (const lesson of section.lessons) {
        // TODO: replace key with unique path
        items.push(<li key={Math.random()}><Link to={lesson.path}>{lesson.name}</Link></li>)
      }
    }
    return (
      <div id='sideMenu' className={visibilityClass}>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
}

export default Menu;
