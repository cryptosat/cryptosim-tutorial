import React from 'react';
import './Tutorial.css'


class Tutorial extends React.Component {

 render() {
    return(
      <div className='tutorial'>
        {this.props.content}
        <div className="nav">
          <button className='nav-button'>&lt; Previous</button>
          <button className='nav-button'>Next &gt;</button>
        </div>
      </div>
    )
  }
}

export default Tutorial
