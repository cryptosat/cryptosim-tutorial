import React from 'react';
import { Link } from "react-router-dom";
import { Map } from '@cryptosat/cryptosim-visualization';
import { Console } from '@cryptosat/jsconsole';
import CodeSnippet from '../CodeSnippet';
import './Lesson.css';
import payload from './basePayload';

import SimulatedClock from '@cryptosat/cryptosim/lib/clocks/simulatedClock';
import GeoCoordinates from '@cryptosat/cryptosim/lib/geoCoordinates';
import GroundStationNetwork from '@cryptosat/cryptosim/lib/groundStationNetwork';
import Universe from '@cryptosat/cryptosim/lib/universe';

const MainClient = require('@cryptosat/cryptosim/lib/clients/main');
const MainService = require('@cryptosat/cryptosim/lib/services/main');
const Satellite = require('@cryptosat/cryptosim/lib/satellite');
const GroundStation = require('@cryptosat/cryptosim/lib/groundStation');

const content = (
  <div>
    <h2>Version</h2>
    <p>
      To obtain the current version of the satellite invoke the following
      command:
    </p>
    <CodeSnippet code={`cryptosat.version();`} />
    <p>
      The returned value contains the <a href="https://semver.org/">
      semantic version</a> of the software running onboard the satellite.
      The software version is reported along with the timestamp at which the
      cryptosat last reported its software version.
    </p>
  </div>
);

class LessonVersion extends React.Component {

  constructor(props) {
    super(props);
    this.payload = payload;
    const clock = new SimulatedClock(new Date(2021, 2, 1, 2, 30, 0, 0));
    clock.setSpeed(10);
    clock.play();
    const universe = new Universe(clock);
    const ISS_TLE = [
      '1 25544U 98067A   21027.77992426  .00003336  00000-0  68893-4 0  9991',
      '2 25544  51.6465 317.1909 0002399 302.6503 164.1536 15.48908950266831',
    ];
    const sat = new Satellite(universe, 'crypto1', ISS_TLE[0], ISS_TLE[1]);
    const gsnetwork = GroundStationNetwork.load(
        universe, require('@cryptosat/cryptosim/data/rbcNetwork'));
    const mainService = new MainService(universe);
    sat.bindService('main', mainService);
    this.payload.cryptosat = new MainClient(universe, sat, gsnetwork, 'main');
    this.payload.universe = universe;
    this.payload.gsnetwork = gsnetwork;
  }

 render() {
    const center = new GeoCoordinates(13.500122104857502, 1.9946736964921719, 0);
    const gsnetwork = new GroundStationNetwork('empty');
    return(
        <div className='split-pane-horizontal'>
          <div className='left-pane'>
            <div className='lesson'>
              <div className="lesson-content">
                {content}
              </div>
              <div className="pager">
                <Link to={this.props.previous}>&lt; Previous</Link>
                <Link to={this.props.next}>Next &gt;</Link>
              </div>
            </div>
          </div>
          <div className='right-pane'>
            <div className='top-pane'>
              <Console payload={payload} theme='dark'/>
            </div>
            <div className='bottom-pane'>
              <Map universe={this.payload.universe} gsnetwork={this.payload.gsnetwork} center={center} />
            </div>
          </div>
        </div>
    )
  }
}

export default LessonVersion
