import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import ResizablePanelsContainer from './components/ResizablePanelsContainer';
import plan from './components/lessons/plan';
import MultipleSatelliteDemo from './components/lessons/MultipleSatelliteDemo';
import LessonOverview from './components/lessons/LessonOverview';
import LessonCommunication from './components/lessons/LessonCommunication';
import LessonAsynchrony from './components/lessons/LessonAsynchrony';
import LessonVersion from './components/lessons/LessonVersion';
import LessonPublicKeys from './components/lessons/LessonPublicKeys';
import LessonTimestamp from './components/lessons/LessonTimestamp';
import LessonPublicRandomness from './components/lessons/LessonPublicRandomness';
import LessonPrivateRandomness from './components/lessons/LessonPrivateRandomness';
import LessonSignature from './components/lessons/LessonSignature';
import LessonNextOnline from './components/lessons/LessonNextOnline';
import LessonSatelliteBasics from './components/lessons/LessonSatelliteBasics';
import LessonGroundStationBasics from './components/lessons/LessonGroundStationBasics';

const componentMap = new Map([
  ['LessonSatelliteBasics', LessonSatelliteBasics],
  ['LessonGroundStationBasics', LessonGroundStationBasics],
  ['LessonOverview', LessonOverview],
  ['LessonCommunication', LessonCommunication],
  ['LessonAsynchrony', LessonAsynchrony],
  ['LessonVersion', LessonVersion],
  ['LessonPublicKeys', LessonPublicKeys],
  ['LessonTimestamp', LessonTimestamp],
  ['LessonPublicRandomness', LessonPublicRandomness],
  ['LessonPrivateRandomness', LessonPrivateRandomness],
  ['LessonSignature', LessonSignature],
  ['LessonNextOnline', LessonNextOnline],
]);

class App extends React.Component {

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
      const props = {'next': next, 'previous': previous}
      const route = (
        // TODO: replace key with unique path
        <Route key={Math.random()} exact path={lesson.path}>
          {React.createElement(componentMap.get(lesson.component), props)}
        </Route>
      );
      routes.push(route);
    }
    return routes;
  }

  render() {
    return (
      <ResizablePanelsContainer>
        <div className='left' />
        <div className='middle' />
        <div className='right' />
      </ResizablePanelsContainer>
    );
  }

  render2() {
    const routes = this.createRoutes();
    return (
      <Router>
        <div className='main'>
          <div className='nav-container'>
            <NavBar />
          </div>
          <div className='content'>
            <Switch>
              {routes}
              <Route exact path='/multiple_satellite_demo'>
                <MultipleSatelliteDemo />
              </Route>
              <Route path="/">
                <Redirect to='/getting-started/overview' />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
