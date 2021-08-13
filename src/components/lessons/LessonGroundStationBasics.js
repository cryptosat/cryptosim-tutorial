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

const clock = new SimulatedClock(new Date(2021, 2, 1, 6, 50, 0, 0));
payload.universe = new Universe(clock);;

const content = (
  <div className='lesson-content'>
    <h2>Ground Stations</h2>
    <p>
      Ground stations are antennas on earth used to communicate with satellites.
      It is possible to construct one's own antenna and communicate with the satellite
      directory but it is more common to rent bandwidth from an existing service provider.
    </p>
    <p>
      The ground station is located at a specific coordinate on earth. To construct
      a Ground station object give it a name and provide the longitude and latitude of its
      location using the GeoCoordinates class:
    </p>
    <CodeSnippet code={`const position = new GeoCoordinates(29.743614,-95.3664777, 0);
const station = new GroundStation(universe, 'houston', position);`
    } />
      You can now observe a blue dot appear on the map representing the ground station you just created.
    <p>
      At any point in time you can obtain the location of the ground station by accessing the position property:
    </p>
      <CodeSnippet code={`station.position();`} />
  </div>
);


class LessonGroundStationBasics extends React.Component {

 render() {
    const zoom = 2.5;
    const center = new GeoCoordinates(40.567952, -98.518132, 0);
    const gsnetwork = new GroundStationNetwork('empty');
    // TODO: replace with new universe.clear() method;
    payload.universe.stations().clear();
    payload.universe.satellites().clear();
    return(
      <div style={{'flex': '1 1 auto', 'overflowY': 'auto'}}>
        <div className='split-pane-horizontal' style={{height: '100%'}}>
          <div className='left-pane' style={{height: '100%'}}>
            <div className='lesson'>
              {content}
              <div className="nav">
                <Link to={this.props.previous}>&lt; Previous</Link>
                <Link to={this.props.next}>Next &gt;</Link>
              </div>
            </div>
          </div>
          <div className='right-pane'>
            <div className='top-pane' style={{overflowY: 'scroll'}}>
              <Console payload={payload} />
            </div>
            <div className='bottom-pane'>
              <Map universe={this.payload.universe}
                   gsnetwork={this.payload.gsnetwork}
                   center={center} zoom={zoom} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LessonGroundStationBasics





        