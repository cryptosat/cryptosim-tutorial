import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./LessonPager.css";

class LessonPager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
      progressBarWidth: (this.props.currentPage / this.props.totalPages) * 100,
    };
  }

  render() {
    const { currentPage, totalPages, progressBarWidth } = this.state;
    const { previous, next } = this.props;

    return (
      <div className="lesson-pager-container">
        <div className="pager">
          <div className="link-container previous">
            {previous && (
              <Link to={previous}>
                <span className="arrow">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span className="caption">Previous</span>
              </Link>
            )}
          </div>
          <div className="link-container center">
            {`${currentPage}/${totalPages}`}
          </div>
          <div className="link-container next">
            {next && (
              <Link to={next}>
                <span className="caption">Next</span>
                <span className="arrow">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-done"
            style={{ width: `${progressBarWidth}%` }}
          />
          <div className="progress-left" />
        </div>
      </div>
    );
  }
}

export default LessonPager;
