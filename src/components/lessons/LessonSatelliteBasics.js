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
    <h2>Satellites</h2>
    <p>
      The basic building block of the cryptosim simulator is the satellite.
      Satellites in the cryptosim simulator represent both an extra-terrestrial object that
      is orbiting the earth at low altitude as well as a server that is able
      to host services to a users on earth.
    </p>
    <p>
      The motion of a satellite is represent using the <a href="https://en.wikipedia.org/wiki/Two-line_element_set">Two Line Element Set</a> format.
      The TLE format packages information about the satellite obtained from
      physical observations that can be used to project the future position of the satellite
      using a <a href="https://en.wikipedia.org/wiki/Simplified_perturbations_models">simplified perturbation model</a>.
      For all intents and purposes the TLE of the satellite can be treated as a black box.
      The important thing to be aware of is that the calculations based on the TLE are only
      estimations, and the estimation error grows larger and larger the further into the future
      the estimations are prorjected. The error is assumed to be on the order of several kilometers
      per day.
    </p>
    <p>
      We will be using the the TLE of the International Space Station (Zarya) as 
      published by <a href="https://www.celestrak.com/NORAD/elements/stations.txt">Celestrak</a> in
      our example to model our the orbit of our cryptosatellites.
    </p>
    <CodeSnippet code={`const ISS_TLE = [
  '1 25544U 98067A   21027.77992426  .00003336  00000-0  68893-4 0  9991',
  '2 25544  51.6465 317.1909 0002399 302.6503 164.1536 15.48908950266831',
];`} />
    With the TLE provided we can go ahead and create a satellite object:
    <CodeSnippet code={
      `const sat = new Satellite(universe, 'crypto1', ISS_TLE[0], ISS_TLE[1]);`
    } />
    The satellite object can be used to obtain its position in space:
    <CodeSnippet code={"sat.getPosition();"} />
    The getPosition function returns a GeoCoordinates object specifying the location
    of the satellite in geodetic coordinates, the familiar latitude, longitude and altitude.
    You will also notice that the satellite you just created appears in the map.
  </div>
);

class LessonSatelliteBasics extends React.Component {

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

    const RBLE_TLE = [
      '1 43021U 98067NJ  21130.93518525  .00169040  23633-4  28154-3 0  9999',
      '2 43021  51.6252  22.9400 0003190 190.1758 169.9188 16.02572645198642',
    ];

    const KE2M_TLE = [
      '1 42982U 98067NE  21130.23731665  .00051060  12134-4  16669-3 0  9993',
      '2 42982  51.6283  34.1214 0000609 175.9980 184.1031 15.91220852202660',
    ];

    const sat1 = new Satellite(universe, 'crypto1', ISS_TLE[0], ISS_TLE[1]);
    const sat2 = new Satellite(universe, 'crypto2', RBLE_TLE[0], RBLE_TLE[1]);
    const sat3 = new Satellite(universe, 'crypto3', KE2M_TLE[0], KE2M_TLE[1]);
    const gsnetwork = GroundStationNetwork.load(
        universe, require('@cryptosat/cryptosim/data/rbcNetwork'));



    const mainService = new MainService(universe);
    sat1.bindService('main', mainService);
    this.payload.cryptosat = new MainClient(universe, gsnetwork, 'main');
    this.payload.sat1 = sat1;
    this.payload.sat2 = sat2;
    this.payload.sat3 = sat3;
    this.payload.universe = universe;
    this.payload.gsnetwork = gsnetwork;
  }

 render() {
    const center = new GeoCoordinates(13.500122104857502, 1.9946736964921719, 0);
    const gsnetwork = new GroundStationNetwork('empty');
    // TODO: replace with new universe.clear() method;
    // payload.universe.stations().clear();
    // payload.universe.satellites().clear();
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

export default LessonSatelliteBasics
