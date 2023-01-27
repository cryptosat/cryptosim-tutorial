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
        className={`${this.state.isCollapse ? "" : "apply-gradient"}`}
        style={{
          width: `calc(100vw - ${this.state.isCollapse ? 95 : 70}%)`,
          height: "100vh",
          flexDirection: "column",
          display: "flex",
          background: "#02000E",
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
            overflowY: "scroll",
            overflowX: "hidden"

          }}
        >
          {!this.state.isCollapse && <>{this.props.children}</>}
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
      </div>
    );
  }
}

export default PanelContainer;
