import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import tweetnacl from "tweetnacl";
import "./App.css";
import PanelContainer from "./components/PanelContainer";
import plan from "./components/lessons/plan";
import MultiSatDemo from "./components/MultiSatDemo";
import Lesson from "./components/Lesson";

import overview from "./components/lessons/javascript/overview";
import communication from "./components/lessons/javascript/communication";
import asynchrony from "./components/lessons/javascript/asynchrony";
import version from "./components/lessons/javascript/version";
import publicKeys from "./components/lessons/javascript/publicKeys";
import timestamp from "./components/lessons/javascript/timestamp";
import publicRandomness from "./components/lessons/javascript/publicRandomness";
import signature from "./components/lessons/javascript/signature";
import nextOnline from "./components/lessons/javascript/nextOnline";
import delayEncryption from "./components/lessons/javascript/delay_encryption";
import privateVoting from "./components/lessons/javascript/privateVoting";

import overviewPython from "./components/lessons/python/overview";
import communicationPython from "./components/lessons/python/communication";
import asynchronyPython from "./components/lessons/python/asynchrony";
import versionPython from "./components/lessons/python/version";
import publicKeysPython from "./components/lessons/python/publicKeys";
import timestampPython from "./components/lessons/python/timestamp";
import publicRandomnessPython from "./components/lessons/python/publicRandomness";
import signaturePython from "./components/lessons/python/signature";
import nextOnlinePython from "./components/lessons/python/nextOnline";
import delayEncryptionPython from "./components/lessons/python/delay_encryption";
import privateVotingPython from "./components/lessons/python/privateVoting";

import {Map as WorldMap} from "@cryptosat/cryptosim-visualization";
import {Console} from "@cryptosat/jsconsole";

import SimulatedClock from "@cryptosat/cryptosim/lib/clocks/simulatedClock";
import GeoCoordinates from "@cryptosat/cryptosim/lib/geoCoordinates";
import GroundStationNetwork from "@cryptosat/cryptosim/lib/groundStationNetwork";
import Universe from "@cryptosat/cryptosim/lib/universe";
import Satellite from "@cryptosat/cryptosim/lib/satellite";
import MainService from "@cryptosat/cryptosim/lib/services/main";
import SandboxClient from "@cryptosat/cryptosim/lib/clients/sandbox";
import binary from "@cryptosat/cryptosim/lib/binary";
import util from "tweetnacl-util";
import init, {encrypt_message} from "@cryptosat/private-voting";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";

import PyConsole from "./components/PyConsole";

const axios = require('axios');

const componentMap = new Map([
  ["overview", overview],
  ["communication", communication],
  ["asynchrony", asynchrony],
  ["version", version],
  ["publicKeys", publicKeys],
  ["timestamp", timestamp],
  ["publicRandomness", publicRandomness],
  // ["privateRandomness", privateRandomness],
  ["signature", signature],
  ["nextOnline", nextOnline],
  ["DelayEncryption", delayEncryption],
  // ["sealedBidAuction", sealedBidAuction],
  ["privateVoting", privateVoting],
]);

const componentMapPython = new Map([
  ["overview", overviewPython],
  ["communication", communicationPython],
  ["asynchrony", asynchronyPython],
  ["version", versionPython],
  ["publicKeys", publicKeysPython],
  ["timestamp", timestampPython],
  ["publicRandomness", publicRandomnessPython],
  // ["privateRandomness", privateRandomness],
  ["signature", signaturePython],
  ["nextOnline", nextOnlinePython],
  ["DelayEncryption", delayEncryptionPython],
  // ["sealedBidAuction", sealedBidAuction],
  ["privateVoting", privateVotingPython],
]);

/* This is an ugly hack in order to make MultiSatDemo override the entire
 * page. */
class AppContainer extends React.Component {
  render() {
    const AppWithRouter = withRouter(App);
    return (
        <Router>
          <AppWithRouter/>
        </Router>
    );
  }
}

function getTLE(satelliteName, catalogNumber) {
  try {
    const response = axios.get('https://celestrak.org/NORAD/elements/gp.php?CATNR=' + catalogNumber);
    console.log(response.data);
    const tleData = response.data.split('\n');

    if (tleData[0].includes(satelliteName)) {
      console.log({
        name: tleData[0].trim(),
        line1: tleData[1].trim(),
        line2: tleData[2].trim(),
      });

      return {"data": tleData};
    }

  } catch (error) {
    return {
      "error": "too many fetches from celestrak"
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.setupUniverse();

    // default to dark if browser set to dark
    const queryParams = new URLSearchParams(window.location.search);
    let theme = 'light';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
    // allow override of browser setting based on HTTP query string param 'theme'
    if(queryParams.has('theme')) {
      const themeValue = queryParams.get('theme');
      if(themeValue === 'dark') {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }

    this.state = {
      isMenuOpen: false,
      language: 'JavaScript',
      theme,
    };
  }

  async componentDidMount() {
    // Initialize WebAssembly
    await init();
  }

  setupUniverse() {
    // This is an ugly hack to make the visualization display the satellite
    // at the same coordiantes regardless of the local time. It's a "hack"
    // because the javascript Date object operates in UTC and has no notion of
    // a timezone. The TLE specification is also timezone agnostic and so it
    // is unclear where the timezone effect is coming from. Since this date was
    // chosen in PST, this the hack does an effective timezone conversion to
    // the equivalent PST time of the chosen timestamp.
    /*let timestamp = new Date();
    console.log(timestamp);
    timestamp.setMilliseconds(timestamp.getMilliseconds());

    const clock = new SimulatedClock(timestamp);
    clock.setSpeed(8);
    clock.play();
    const universe = new Universe(clock);

    const CRYPTO1_TLE = [
      '1 52761U 22057AF  22233.85321675  .00001599  00000+0  94288-4 0  9994',
      '2 52761  97.5232 347.6308 0010802 295.0245  64.9864 15.12964773 13321',
    ];*/

    let timestamp = new Date();
    timestamp.setMilliseconds(timestamp.getMilliseconds());

    const clock = new SimulatedClock(timestamp);
    clock.setSpeed(8);
    clock.play();
    const universe = new Universe(clock);

    var crypto1_tle_fetch = getTLE('COSMOS 422 DEB', 38531);
    var crypto2_tle_fetch = getTLE('COSMOS 422 DEB', 38531);
    var iss_tle_fetch = getTLE('ISS', 38531);

    var ISS_TLE = [
      '1 25544U 98067A   22357.56376573  .00009640  00000-0  17942-3 0  9996',
      '2 25544  51.6419 118.4508 0005698 179.4554 285.1029 15.49550321374554'
    ];

    var CRYPTO1_TLE = [
      '1 52761U 22057AF  22356.77347150  .00003204  00000-0  18130-3 0  9994',
      '2 52761  97.5340 109.0374 0010896 222.1353 137.9042 15.13730895 31919'
    ];

    var CRYPTO2_TLE = [
      '1 52761U 22057AF  23086.33553366  .00007115  00000-0  38501-3 0  9994',
      '2 52761  97.5353 202.6397 0010567 258.5907 101.4138 15.14912560 46225'
    ];

    console.log(iss_tle_fetch.hasOwnProperty("error"));

    if (!iss_tle_fetch.hasOwnProperty("error")) {
      ISS_TLE[0] = iss_tle_fetch["data"].line1;
      ISS_TLE[1] = iss_tle_fetch["data"].line2;
    }

    if (!crypto1_tle_fetch.hasOwnProperty("error")) {
      CRYPTO1_TLE[0] = crypto1_tle_fetch["data"].line1;
      CRYPTO1_TLE[1] = crypto1_tle_fetch["data"].line2;
    }

    if (!crypto2_tle_fetch.hasOwnProperty("error")) {
      CRYPTO2_TLE[0] = crypto2_tle_fetch["data"].line1;
      CRYPTO2_TLE[1] = crypto2_tle_fetch["data"].line2;
    }

    const iss = new Satellite(universe, 0, "iss", ISS_TLE[0], ISS_TLE[1]);
    const crypto1 = new Satellite(
        universe,
        1,
        "crypto1",
        CRYPTO1_TLE[0],
        CRYPTO1_TLE[1]
    );

    const crypto2 = new Satellite(universe, 1, "crypto2", CRYPTO2_TLE[0], CRYPTO2_TLE[1]);
    const gsnetwork = GroundStationNetwork.load(
        universe,
        require("@cryptosat/cryptosim/data/rbcNetwork")
    );
    const mainService = new MainService(universe, [crypto1, crypto2]);
    //mainService.addSatellite(crypto1);
    //mainService.addSatellite(crypto2);
    crypto1.bindService("main", mainService);
    crypto2.bindService("main", mainService);
    const client = new SandboxClient();

    this.payload = {
      cryptosat: client,
      binary: binary,
      nacl: tweetnacl,
      util: util,
      encrypt_message: encrypt_message,
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
      if (i > 0) {
        const previousLesson = flatLessons[i - 1];
        previous = previousLesson.disabled ? null : previousLesson.path;
      }
      if (i < flatLessons.length - 1) {
        const nextLesson = flatLessons[i + 1];
        next = nextLesson.disabled ? null : nextLesson.path;
      }
      const content = this.state.language === 'JavaScript' ? componentMap.get(lesson.content) : componentMapPython.get(lesson.content);
      const route = (
          <Route key={lesson.path} exact path={lesson.path}>
            <Lesson
                content={content}
                previous={previous}
                next={next}
                totalPages={flatLessons.length}
                currentPage={i + 1}
                theme={this.state.theme}
            />
          </Route>
      );
      routes.push(route);
    }
    return routes;
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });;
  }

  setLanguage = (language) => {
    this.setState({
      language,
    });
  };

  setMenuOpen = (isOpen) => {
    this.setState({
      isMenuOpen: isOpen,
    });
  };

  setTheme = (theme) => {
    this.setState({
      theme,
    });
    console.log('theme changed to ',theme);
  };

  render() {
    if (this.props.location.pathname === "/multisat") {
      return <MultiSatDemo/>;
    }

    const zoom = 2.5;
    const center = new GeoCoordinates(40.567952, -98.518132, 0);
    const routes = this.createRoutes(this.state.language);

    const consoleContainerClassname = 'console-container '+this.state.theme;
    const contentContainerClassname = 'content-container '+this.state.theme;

    return (
        <div className="main">
          <NavBar
              toggleMenu={this.toggleMenu} theme={this.state.theme}
          />
          <div className="content">

            <div className="background">
              <WorldMap
                  universe={this.universe}
                  gsnetwork={this.gsnetwork}
                  center={center}
                  zoom={zoom}
                  theme={this.state.theme}
              />
            </div>

            <div className={contentContainerClassname}>
              <Menu isOpen={this.state.isMenuOpen} setMenuOpen={this.setMenuOpen} setLanguage={this.setLanguage} setTheme={this.setTheme} theme={this.state.theme} language={this.state.language} />

              <PanelContainer theme={this.state.theme}>
                <Switch>
                  {routes}
                  <Route path="/">
                    <Redirect to="/getting-started/overview"/>
                  </Route>
                </Switch>
              </PanelContainer>

              <div className={consoleContainerClassname}>
                { this.state.language === 'JavaScript' ? (
                  <Console payload={this.payload} theme={this.state.theme} />
                ) : (
                  <PyConsole theme={this.state.theme} />
                )}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default AppContainer;
