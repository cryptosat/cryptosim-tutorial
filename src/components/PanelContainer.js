import React from "react";
import "../App.css"; // DELETE
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
    return (
      <div
        style={{
          width: `calc(100vw - ${this.state.isCollapse ? 90 : 70}%)`,
          height: "100vh",
          flexDirection: "column",
          display: "flex",
          background: `linear-gradient(
            166.28deg,
            #02000e 52.56%,
            #320541 65.04%,
            #6d0d8d 70.01%,
            #320541 74.99%,
            #030014 84.23%
          )`
        }}
      >
        {/* <div className="nav-container"> */}
        <NavBar
          togglePanel={this.togglePanel}
          isPannelCollapse={this.state.isCollapse}
        />

        <div
          style={{
            flex: 1,
            overflow: "scroll",
          }}
        >
          {!this.state.isCollapse && <>{this.props.children}</>}
        </div>
      </div>
    );
  }
}

export default PanelContainer;
