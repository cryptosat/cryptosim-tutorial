import React from 'react';
import './PanelContainer.css';
import { faAnglesLeft } from '@fortawesome/pro-thin-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setCollapsed = this.setCollapsed.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.state = {
      isCollapsed: false
    };
  }

  setCollapsed(instructionsCollapsed) {
    this.setState({ instructionsCollapsed });
  }

  toggleCollapsed(e) {
    e.stopPropagation();
    this.setCollapsed(!this.state.instructionsCollapsed);
  }

  render() {
    const panelClassName = this.state.instructionsCollapsed
      ? 'panel-container__left instructions-collapsed'
      : 'panel-container__left';
    const instructionsPanelContent = !this.state.instructionsCollapsed ? this.props.children[2]: null;

    return (
      <div className='panel-container'>
        <div className={panelClassName}>
          <nav>
            <button onClick={this.toggleCollapsed}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          </nav>
          <div className='instructionsPanel'>{instructionsPanelContent}</div>
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
