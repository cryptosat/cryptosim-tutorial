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
        <NavBar
          togglePanel={this.togglePanel}
          isPannelCollapse={this.state.isCollapse}
        />

        <div className="instructions-container">
          {!this.state.isCollapse && <>{this.props.children}</>}
        </div>
        <div className="apply-dots">
          <div className="dot" style={{ left: "2%", top: "85%" }}></div>
          <div className="dot" style={{ left: "2%", top: "65%" }}></div>
          <div className="dot" style={{ left: "8%", top: "72%" }}></div>
          <div className="dot" style={{ left: "23%", top: "62%" }}></div>
          <div className="dot" style={{ left: "40%", top: "53%" }}></div>
          <div className="dot" style={{ left: "50%", top: "60%" }}></div>
          <div className="dot" style={{ left: "58%", top: "48%" }}></div>
          <div className="dot" style={{ left: "48%", top: "38%" }}></div>
          <div className="dot md" style={{ left: "45%", top: "70%" }}></div>
          <div className="dot md" style={{ left: "20%", top: "72%" }}></div>
          <div className="dot md" style={{ left: "38%", top: "65%" }}></div>
          <div className="dot lg" style={{ left: "30%", top: "65%" }}></div>
          <div className="dot lg" style={{ left: "15%", top: "80%" }}></div>
        </div>
      </div>
    );
  }
}

export default PanelContainer;
