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
import LessonSatelliteBasics from './components/lessons/LessonSatelliteBasics';
import LessonGroundStationBasics from './components/lessons/LessonGroundStationBasics';

const componentMap = new Map([
  ['LessonSatelliteBasics', LessonSatelliteBasics],
  ['LessonGroundStationBasics', LessonGroundStationBasics],
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
        previous = flatLessons[i - 1].path;
      }
      if (i < flatLessons.length - 1) {
        next = flatLessons[i + 1].path;
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
    const routes = this.createRoutes();
    return (
      <Router>
       <div className='main' style={{'display': 'flex', 'flexFlow': 'column', 'overflow': 'hidden'}}>
        <div style={{height: '80px', 'flex': '0 0 50px'}}>
          <NavBar />
        </div>
          <Switch>
           {routes}
           <Route path="/">
              <Redirect to='/satellites/basics' />
           </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
