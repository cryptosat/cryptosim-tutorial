import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './LessonPager.css';


class LessonPager extends React.Component {

  render() {
    let previous = null;
    let next = null;
    
    if (this.props.previous) {
      previous = (
        <Link to={this.props.previous}>
          <span className='arrow'>
            <FontAwesomeIcon icon={faArrowLeft}/>
          </span>
          <span className='caption'>Previous</span>
        </Link>
      );
    }

    if (this.props.next) {
      next = (
        <Link to={this.props.next}>
          <span className='caption'>Next</span>
          <span className='arrow'>
            <FontAwesomeIcon icon={faArrowRight}/>
          </span>
        </Link>
      );
    }

    return (
      <div className="pager">
        <div className={'link-container previous'}>{previous}</div>
        <div className='link-container next'>{next}</div>
      </div>
    );
  }

}

export default LessonPager;