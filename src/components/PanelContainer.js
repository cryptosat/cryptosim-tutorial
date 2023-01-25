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
          backgroundColor: "#02000E",
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
