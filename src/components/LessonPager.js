import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./LessonPager.css";

class LessonPager extends React.Component {
  render() {
    let previous = null;
    let next = null;

    if (this.props.previous) {
      previous = (
        <Link to={this.props.previous}>
          <span className="arrow">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="caption" style={{ marginLeft: "5px" }}>
            Previous
          </span>
        </Link>
      );
    }

    if (this.props.next) {
      next = (
        <Link to={this.props.next}>
          <span className="caption" style={{ marginRight: "5px" }}>
            Next
          </span>
          <span className="arrow">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </Link>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "10%",
        }}
      >
        <div className="pager">
          <div className={"link-container previous"}>{previous}</div>
          {/* <div className="link-container ">{next}</div> */}
          <div
            className="link-container"
            style={{
              justifyContent: "center",
            }}
          >{`${this.props.currentPage}/${this.props.totalPages}`}</div>
          <div className="link-container next">{next}</div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-done"
            style={{
              width: `${
                (this.props.currentPage / this.props.totalPages) * 100
              }%`,
            }}
          ></div>
          <div className="progress-left"></div>
        </div>
      </div>
    );
  }
}

export default LessonPager;
