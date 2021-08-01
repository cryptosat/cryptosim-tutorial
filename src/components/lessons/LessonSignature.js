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
    <h2>Signature</h2>
    <p>
      The cryptosat can sign messages sent to it by end users. The cryptosat
      signs the message, along with the current timestamp using its signature
      key. The current timestamp is appended to prevent backdating of
      signatures. The cryptosat service takes care of coordinating the
      transmission of the message to the appropriate ground station when the
      cryptosat is online. To sign a message invoke the following API call:
    </p>
    <CodeSnippet code={`tracker = cryptosat.sign('hello, world!');`} />
    <p>
      The API call returns a tracker object allowing the user to track the
      status of the request. The status of the request can be obtained by
      invoking the status method:
    </p>
    <CodeSnippet code={`tracker.status();`} />
    <p>
      After the cryptosat signed the message and transmits the signature back to
      earth, the status of the message will change to ‘Ready’ and the result of
      the request can be obtained by invoking the tracker’result method:
    </p>
    <CodeSnippet code={`result = tracker.result();`} />
    <p>
      You can verify that the signature is valid using the
      <a href="https://nacl.cr.yp.to/box.html">NaCl</a> library as shown in the
      following snippet:
    </p>
    <CodeSnippet code={`key = cryptosat.getPublicSigningKey();
msg = binary.appendBuffers(
      binary.str2ab('hello, world!'),
      binary.intToArrayBuffer(result.timestamp));
nacl.sign.detached.verify(msg, result.signature, key);`} />
  </div>
);

class LessonSignature extends React.Component {

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

export default LessonSignature
