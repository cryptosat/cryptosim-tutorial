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
    <h2>Private Randomness</h2>
    <p>
      The cryptosatellite can serve private randomness to users. Users can
      supply their own public key and the cryptosate service will generate
      random bits and encrypt them with the user-provided key. The cryptosat
      also signs the message using its signature key. First, generate a local
      key pair and a nonce.
    </p>
    <CodeSnippet code={`clientKey = nacl.box.keyPair();
nonce = nacl.randomBytes(nacl.box.nonceLength);`} />
    <p>
      Then invoke the Cryptosat API call:
    </p>
    <CodeSnippet code={`promise = cryptosat.getPrivateRandom(clientKey.publicKey, nonce);`} />
    <p>
      The API call returns a promise which is fulfilled once the satellite
      signed the message and transmitted the signature back to earth. When the
      request has been fulfilled, obtain the result using the await keyword:
    </p>
    <CodeSnippet code={`result = await promise;`} />
    <p>You can now decrypt the message using the following snippet:</p>
    <CodeSnippet code={`encryptionKey = cryptosat.getPublicEncryptionKey();
plain = nacl.box.open(result.encryptedRandom, nonce, encryptionKey, clientKey.secretKey);`} />
    <p>And verify that the signature is valid using the this snippet:</p>
    <CodeSnippet code={`signingKey = cryptosat.getPublicSigningKey();
nacl.sign.detached.verify(result.encryptedRandom, result.signature, signingKey)`} />
  </div>
);

class LessonPrivateRandomness extends React.Component {

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

export default LessonPrivateRandomness
