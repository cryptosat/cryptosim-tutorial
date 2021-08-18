import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
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

  constructor() {
    super();
    this.contentRef = React.createRef();
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.numPanels = 3;
    this.state = {
      dragging: false,
      contentWidth: null,
      panelWidths: [200, 200, 300],
      selectedDividerIndex: null,
      selectedDividerX: null,
    }
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

  componentDidMount() {
    const dividerWidthPx = 4;
    const contentWidth = this.contentRef.current.offsetWidth - (
      (this.numPanels - 1) * dividerWidthPx);
    this.setState({
      contentWidth: contentWidth,
      panelWidths: [200, 400, contentWidth - (200 + 400)],
    });
  }

  onMouseDown(index, e) {
    this.setState({
      dragging: true,
      selectedDividerIndex: index,
      selectedDividerX: e.clientX,
    })
  }

  onMouseUp(e) {
    this.setState({
      dragging: false,
    });
  }

  onMouseMove(e) {
    if (!this.state.dragging) return;
    const widths = this.state.panelWidths;
    const index = this.state.selectedDividerIndex;
    const expandRight = e.clientX > this.state.selectedDividerX;
    let maxWidth = this.state.contentWidth;
    const sum = (arr) => arr.reduce((a, b) => a + b);
    let delta = Math.abs(e.clientX - this.state.selectedDividerX);

    if (expandRight) {
      delta = Math.min(delta, sum(widths.slice(index + 1)));
      widths[index] += delta;
      let shrinkAmount = -delta;
      for (let i = index + 1; i < this.numPanels; ++i) {
        widths[i] += shrinkAmount;
        if (widths[i] > 0) {
          break;
        } else {
          shrinkAmount = widths[i];
          widths[i] = 0;
        }
      }
    } else {
      delta = Math.min(delta, sum(widths.slice(0, index + 1)));
      widths[index + 1] += delta;
      let shrinkAmount = -delta;
      for (let i = index; i >= 0; --i) {
        widths[i] += shrinkAmount;
        if (widths[i] > 0) {
          break;
        } else {
          shrinkAmount = widths[i];
          widths[i] = 0;
        }
      }
    }

    const minWidth = 1;
    if (widths[0] < minWidth) {
      let diff = widths[0] - minWidth;
      widths[0] = minWidth;
      for (let i = 1; i < this.numPanels; ++i) {
        if (widths[i] > 0) {
          widths[i] += diff;
          if (widths[i] > 0) {
            break;
          } else {
            diff = widths[i]
            widths[i] = 0;
          }
        }
      }
    }

    this.setState({
      selectedDividerX: e.clientX,
      panelWidths: widths,
    });
  }

  render() {
    return (
      <Router>
        <div className='main'>
          <div className='content' ref={this.contentRef}
              onMouseMove={this.onMouseMove}
              onMouseUp={this.onMouseUp}
              onMouseLeave={this.onMouseLeave}>
            <div className='left'
                 style={{width: this.state.panelWidths[0]}}></div>
            <div className='divider'
                 onMouseDown={(e) => {this.onMouseDown(0, e)}} />
            <div className='middle'
                 style={{width: this.state.panelWidths[1]}}></div>
            <div className='divider'
                 onMouseDown={(e) => {this.onMouseDown(1, e)}} />
            <div className='right'
                 style={{width: this.state.panelWidths[2]}}></div>
          </div>
        </div>
      </Router>
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
