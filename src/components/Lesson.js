import React from 'react';
import './Lesson.css';
import LessonPager from './LessonPager';

class Lesson extends React.Component {

  render() {
    return(
      <div className='lesson'>
        <div className='lesson-content'>
          {this.props.content}
        </div>
        {/* <LessonPager previous={this.props.previous} next={this.props.next} /> */}
      </div>
    )
  }

}

export default Lesson;
