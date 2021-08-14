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
    <h2>Timestamp</h2>
    <p>
      The cryptosat reports the current timestamp in periodic intervals.
      The timestamp, reported as milliseconds since epoch, is signed by the
      satellite’s public signing key. The timestamp and its signature can be
      obtained using following API call:
    </p>
    <CodeSnippet code={`result = cryptosat.getTimestamp();`} />
    <p>
      You can verify the signature of the timestamp using the 
      <a href="https://nacl.cr.yp.to/box.html">NaCl</a> library as shown in
      the following snippet:
    </p>
    <CodeSnippet code={`key = cryptosat.getPublicSigningKey();
timestamp = binary.int2ab(result.timestamp);
nacl.sign.detached.verify(timestamp, result.signature, key);`} />
  </div>
);

class LessonTimestamp extends React.Component {

  constructor(props) {
    super(props);
    this.payload = payload;
    const clock = new SimulatedClock(new Date(2021, 2, 1, 6, 50, 0, 0));
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
    const zoom = 2.5;
    const center = new GeoCoordinates(40.567952, -98.518132, 0);
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
              <Map universe={this.payload.universe}
                   gsnetwork={this.payload.gsnetwork}
                   center={center} zoom={zoom} />
            </div>
          </div>
        </div>
    )
  }
}

export default LessonTimestamp
