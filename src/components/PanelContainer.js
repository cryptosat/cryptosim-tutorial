import React from "react";
import "./PanelContainer.css";
import NavBar from "./NavBar";

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.togglePanel = this.togglePanel.bind(this);
    this.state = {
      isCollapse: false,
    };
  }

  togglePanel() {
    this.setState({
      isCollapse: !this.state.isCollapse,
    });
  }

  render() {
    const contentClassName = `content-container__left ${
      this.state.isCollapse ? "collapsed" : "apply-gradient"
    }`;

    return (
      <div className={contentClassName}>
        <div className="instructions-container">
          {!this.state.isCollapse && <>{this.props.children}</>}
        </div>
        <div className="apply-dots">
        </div>
      </div>
    );
  }
}

export default PanelContainer;
