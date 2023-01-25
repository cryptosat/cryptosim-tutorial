import React from 'react';
import './PanelContainer.css';

class PanelContainer extends React.Component {

  render() {
    return (
      <div className='panel-container'>
        <div className='panel-container__left'>
          <div className='instructionsPanel'>{this.props.children[2]}</div>
        </div>
        <div className='panel-container__right'>
          <div className='mapPanel'>{this.props.children[1]}</div>
          <div className='consolePanel'>{this.props.children[0]}</div>
        </div>
      </div>
    );
  }

}

export default PanelContainer;
