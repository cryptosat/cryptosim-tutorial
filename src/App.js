import React from 'react';
import './App.css';
import { Map, ControlBar, GroundStationNetworkCoverage, Trajectory, SatelliteInfoBar } from '@cryptosat/cryptosim-visualization';
import { Console } from '@cryptosat/jsconsole';
import { payload, content } from './content/satellite';
import GroundStationNetwork from '@cryptosat/cryptosim/lib/groundStationNetwork';
import GeoCoordinates from '@cryptosat/cryptosim/lib/geoCoordinates';
import Tutorial from './components/Tutorial';
import NavBar from './components/NavBar';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      universe: payload.universe,
      satelliteId: null,
      displayCoverage: false,
      displayTrajectory: false,
    };
  }

  setSatellite(satelliteId) {
    this.setState({satelliteId: satelliteId});
  }

  setCoverageDisplay(value) {
    this.setState({displayCoverage: value});
  }

  setTrajectoryDisplay(value) {
    this.setState({displayTrajectory: value});
  }

  render() {
    const gsnetwork = new GroundStationNetwork('empty-network')
    const sat = payload.universe.satellites().get(this.state.satelliteId);
    let trajectory = this.state.displayTrajectory ? <Trajectory satellite={sat}/> : null;
    // let coverage = this.state.displayCoverage ? <GroundStationNetworkCoverage gsnetwork={gsnetwork}/> : null;
    let center = new GeoCoordinates(1.9946736964921719, 63.500122104857502, 0);
    return (
      <div className='main' style={{'display': 'flex', 'flexFlow': 'column', 'overflow': 'hidden'}}>
        <div style={{height: '80px', 'flex': '0 0 50px'}}>
          <NavBar />
        </div>
        <div style={{'flex': '1 1 auto', 'overflowY': 'auto'}}>
          <div className='split-pane-horizontal' style={{height: '100%'}}>
            <div className='left-pane' style={{height: '100%'}}>
              <Tutorial content={content}/>
            </div>
            <div className='right-pane'>
              <div className='top-pane' style={{overflowY: 'scroll'}}>
                <Console payload={payload} />
              </div>
              <div className='bottom-pane'>
                {/*<ControlBar universe={payload.universe}
                    setSatellite={this.setSatellite.bind(this)}
                    setCoverageDisplay={this.setCoverageDisplay.bind(this)}
                    setTrajectoryDisplay={this.setTrajectoryDisplay.bind(this)}/>*/}
                <Map universe={this.state.universe} gsnetwork={gsnetwork} center={center}>
                  {/*coverage*/}
                  {trajectory}
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
