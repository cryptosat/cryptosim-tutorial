import nacl from 'tweetnacl';
import binary from '@cryptosat/cryptosim/lib/binary';
import GeoCoordinates from '@cryptosat/cryptosim/lib/geoCoordinates';
import GroundStation from '@cryptosat/cryptosim/lib/groundStation';
import GroundStationNetwork from '@cryptosat/cryptosim/lib/groundStationNetwork';
import LookAngle from '@cryptosat/cryptosim/lib/lookAngle';
import Orbit from '@cryptosat/cryptosim/lib/orbit';
import Satellite from '@cryptosat/cryptosim/lib/satellite';
import Universe from '@cryptosat/cryptosim/lib/universe';
import MainClient from '@cryptosat/cryptosim/lib/clients/main';
import MainService from '@cryptosat/cryptosim/lib/services/main';
import Service from '@cryptosat/cryptosim/lib/services/service';
import SimulatedClock from '@cryptosat/cryptosim/lib/clocks/simulatedClock';

const payload = {
  binary: binary,
  nacl: nacl,
  GeoCoordinates: GeoCoordinates,
  GroundStation: GroundStation,
  GroundStationNetwork: GroundStationNetwork,
  LookAngle: LookAngle,
  Orbit: Orbit,
  Satellite: Satellite,
  Universe: Universe,
  MainClient: MainClient,
  MainService: MainService,
  Service: Service,
  SimulatedClock: SimulatedClock,
}


export default payload;
