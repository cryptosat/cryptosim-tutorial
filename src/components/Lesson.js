import React from 'react';
import './Lesson.css';
import LessonPager from './LessonPager';

class Lesson extends React.Component {

  render() {
    return (
      <div className='lesson'>
        <div className='lesson-content'>
          {this.props.content}
        </div>
        <div className='lesson-gradient'>
          <div className='circle-small' style={{left:'2%',top:'85%'}}></div>
          <div className='circle-small' style={{left:'2%',top:'65%'}}></div>
          <div className='circle-small' style={{left:'8%',top:'72%'}}></div>
          <div className='circle-small' style={{left:'23%',top:'62%'}}></div>
          <div className='circle-small' style={{left:'40%',top:'53%'}}></div>
          <div className='circle-small' style={{left:'50%',top:'60%'}}></div>
          <div className='circle-small' style={{left:'58%',top:'48%'}}></div>
          <div className='circle-small' style={{left:'48%',top:'38%'}}></div>
          <div className='circle-medium' style={{left:'45%',top:'70%'}}></div>
          <div className='circle-medium' style={{left:'20%',top:'72%'}}></div>
          <div className='circle-medium' style={{left:'38%',top:'65%'}}></div>
          <div className='circle-large' style={{left:'30%',top:'65%'}}></div>
          <div className='circle-large' style={{left:'15%',top:'80%'}}></div>
        </div>
        <LessonPager previous={this.props.previous} next={this.props.next} totalPages={this.props.totalPages} currentPage={this.props.currentPage} />
      </div>
    )
  }

}

export default Lesson;
