import React from 'react';
import './Tutorial.css'


class Tutorial extends React.Component {

  constructor(props) {
    super(props);
  }

 render() {
    return(
      <div className='tutorial'>
        {this.props.content}
        <div className="nav">
          <button className='nav-button'>Previous</button>
          <button className='nav-button'>Next</button>
        </div>
      </div>
    )
  }
}

export default Tutorial
