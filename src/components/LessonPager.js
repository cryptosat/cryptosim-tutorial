import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './LessonPager.css';


class LessonPager extends React.Component {

  render() {
    let previous = null;
    let next = null;
    let totalPages = this.props.totalPages ;
    let currentPage = this.props.currentPage ;

    if (this.props.previous) {
      previous = (
        <Link to={this.props.previous}>
          <span className='arrow'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className='caption'>Previous</span>
        </Link>
      );
    }

    if (this.props.next) {
      next = (
        <Link to={this.props.next}>
          <span className='arrow'>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
          <span className='caption'>Next</span>
        </Link>
      );
    }

    return (
      <>
        <div className="pager">
          <div className={'link-container previous'}>{previous}</div>
          <div className={'link-container numbering'}>{currentPage}/{totalPages}</div>
          <div className='link-container next'>{next}</div>
        </div>
        <div className='progress-bar'>
          <div className='progress-fill' style={{width:`${(currentPage/totalPages)*100}%`}}></div>
        </div>
      </>
    );
  }

}

export default LessonPager;