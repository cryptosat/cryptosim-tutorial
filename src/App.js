import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import tweetnacl from 'tweetnacl';
import './App.css';
import NavBar from './components/NavBar';
import PanelContainer from './components/PanelContainer';
import plan from './components/lessons/plan';
import MultiSatDemo from './components/MultiSatDemo';
import Lesson from './components/Lesson';

import overview from './components/lessons/overview';
import communication from './components/lessons/communication';
import asynchrony from './components/lessons/asynchrony';
import version from './components/lessons/version';
import publicKeys from './components/lessons/publicKeys';
import timestamp from './components/lessons/timestamp';
import publicRandomness from './components/lessons/publicRandomness';
import privateRandomness from './components/lessons/privateRandomness';
import signature from './components/lessons/signature';
import nextOnline from './components/lessons/nextOnline';

import { Map as WorldMap } from '@cryptosat/cryptosim-visualization';
import { Console } from '@cryptosat/jsconsole';

import SimulatedClock from '@cryptosat/cryptosim/lib/clocks/simulatedClock';
import GeoCoordinates from '@cryptosat/cryptosim/lib/geoCoordinates';
import GroundStationNetwork from '@cryptosat/cryptosim/lib/groundStationNetwork';
import Universe from '@cryptosat/cryptosim/lib/universe';
import Satellite from '@cryptosat/cryptosim/lib/satellite';
import MainService from '@cryptosat/cryptosim/lib/services/main';
import MainClient from '@cryptosat/cryptosim/lib/clients/main';
import binary from '@cryptosat/cryptosim/lib/binary';


const componentMap = new Map([
  ['overview', overview],
  ['communication', communication],
  ['asynchrony', asynchrony],
  ['version', version],
  ['publicKeys', publicKeys],
  ['timestamp', timestamp],
  ['publicRandomness', publicRandomness],
  ['privateRandomness', privateRandomness],
  ['signature', signature],
  ['nextOnline', nextOnline],
])


/* This is an ugly hack in order to make MultiSatDemo override the entire
 * page. */
class AppContainer extends React.Component {
  render() {
    const AppWithRouter = withRouter(App);
    return (
      <Router>
        <AppWithRouter />
      </Router>
    );
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.setupUniverse();
  }

  setupUniverse() {
    // This is an ugly hack to make the visualization display the satellite
    // at the same coordiantes regardless of the local time. It's a "hack"
    // because the javascript Date object operates in UTC and has no notion of
    // a timezone. The TLE specification is also timezone agnostic and so it
    // is unclear where the timezone effect is coming from. Since this date was
    // chosen in PST, this the hack does an effective timezone conversion to
    // the equivalent PST time of the chosen timestamp.
    let timestamp = new Date(2021, 2, 1, 6, 50, 0, 0);
    let offset = (8 * 60 - timestamp.getTimezoneOffset()) * 60 * 1000;
    timestamp.setMilliseconds(timestamp.getMilliseconds() + offset);

    const clock = new SimulatedClock(timestamp);
    clock.setSpeed(8);
    clock.play();
    const universe = new Universe(clock);

    const ISS_TLE = [
      '1 25544U 98067A   21027.77992426  .00003336  00000-0  68893-4 0  9991',
      '2 25544  51.6465 317.1909 0002399 302.6503 164.1536 15.48908950266831',
    ];

    const sat = new Satellite(universe, 'crypto1', ISS_TLE[0], ISS_TLE[1]);
    const gsnetwork = GroundStationNetwork.load(universe,
      require('@cryptosat/cryptosim/data/rbcNetwork'));
    const mainService = new MainService(universe);
    sat.bindService('main', mainService);
    const client = new MainClient(universe, sat, gsnetwork, 'main');

    this.payload = {
      cryptosat: client,
      binary: binary,
      nacl: tweetnacl,
    };
    this.universe = universe;
    this.gsnetwork = gsnetwork;
  }

  createRoutes() {
    const flatLessons = [];
    for (const section of Object.values(plan)) {
      for (const lesson of section.lessons) {
        flatLessons.push(lesson);
      }
    }

    const routes = [];
    for (let i = 0; i < flatLessons.length; i++) {
      const lesson = flatLessons[i];
      let next = null;
      let previous = null;
      if  (i > 0) {
        const previousLesson = flatLessons[i - 1];
        previous = previousLesson.disabled ? null : previousLesson.path;
      }
      if (i < flatLessons.length - 1) {
        const nextLesson = flatLessons[i + 1];
        next = nextLesson.disabled ? null : nextLesson.path;
      }
      const content = componentMap.get(lesson.content);
      const route = (
        <Route key={lesson.path} exact path={lesson.path}>
          <Lesson content={content} previous={previous} next={next} />
        </Route>
      );
      routes.push(route);
    }
    return routes;
  }

  render() {
    if (this.props.location.pathname === '/multisat') {
      return <MultiSatDemo />;
    }

    const zoom = 2.5;
    const center = new GeoCoordinates(40.567952, -98.518132, 0);
    const routes = this.createRoutes();

    const leftPanelContent = (
            <Switch>
              {routes}
              <Route path="/">
                <Redirect to='/getting-started/overview' />
              </Route>
            </Switch>
    )

    const middlePanelContent = (
        <div className='map-hole'>
          <WorldMap universe={this.universe}
                 gsnetwork={this.gsnetwork}
                 center={center} zoom={zoom}/>
        </div>
    )

    return (
      <div className='main'>
        <div className='nav-container'>
          <NavBar />
        </div>
        <div className='content'>
          <PanelContainer>
            {leftPanelContent}
            {middlePanelContent}
            <Console theme='dark' payload={this.payload}/>
          </PanelContainer>
        </div>
      </div>
    );
  }

}

export default AppContainer;
