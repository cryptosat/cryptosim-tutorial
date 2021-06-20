import SimulatedClock from '@cryptosat/cryptosim/lib/clocks/simulatedClock';
import Universe from '@cryptosat/cryptosim/lib/universe';
import Satellite from '@cryptosat/cryptosim/lib/satellite';
import CodeSnippet from '../components/CodeSnippet';

const clock = new SimulatedClock(new Date(2021, 2, 1, 2, 30, 0, 0));
const universe = new Universe(clock);

const payload = {
  universe: universe,
  Satellite: Satellite,
};

const content = (
  <div className='tutorial-content'>
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
)


export {
  payload,
  content,
};