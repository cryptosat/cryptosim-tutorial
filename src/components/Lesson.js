import React from "react";
import "./Lesson.css";
import LessonPager from "./LessonPager";

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const lessonClassName = 'lesson '+this.props.theme;
    return (
      <div className={lessonClassName}>
        <div className={"lesson-content "+this.props.theme}>{this.props.content}</div>
        <LessonPager
          previous={this.props.previous}
          next={this.props.next}
          totalPages={this.props.totalPages}
          currentPage={this.props.currentPage}
          theme={this.props.theme}
        />
      </div>
    );
  }
}

export default Lesson;
