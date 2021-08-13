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
    <h2>Communication Windows</h2>
    <p>
      Cryptosats are designed to be launched at low earth orbit. This means
      they are constantly moving across the sky, completing a revolution of the
      earth approximately every 1.5 hours. While our ground stations are spread
      across the globe to ensure maximum coverage, there will still be occasions
      in which the satellite will be out of the reach of our extensive ground
      station network and thus be offline. For that reason the Cryptosat service
      caches the latest transmissions from the satellite and makes them
      accessible via the Cryptosat API. Responses to most API calls will
      contain a timestamp indicating when the transmission from the satellite,
      on which the response is based, was received.
    </p>
    <p>
      The online status of the Satelitte is displayed visually on the map.
      A green satellite indicates the satellite is online whereas a a red
      satellite is offline. You can also toggle the coverage layer to visualize
      the coverage provided by our ground station network. Whenever the
      satellite enters the covered regions it will turn green and whenever the
      satellite leaves the covered region it will turn red.
    </p>
  </div>
);

class LessonCommunication extends React.Component {

  constructor(props) {
    super(props);
    this.payload = payload;
    const clock = new SimulatedClock(new Date(2021, 2, 1, 6, 50, 0, 0));
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
    const zoom = 2.5;
    const center = new GeoCoordinates(40.567952, -98.518132, 0);
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
              <Map universe={this.payload.universe}
                   gsnetwork={this.payload.gsnetwork}
                   center={center} zoom={zoom} />
            </div>
          </div>
        </div>
    )
  }
}

export default LessonCommunication
