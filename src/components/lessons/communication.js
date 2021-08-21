const content = (
  <div>
    <h2>Communication Windows</h2>
    <p>
      Cryptosats are designed to be launched at low earth orbit. This means
      they are constantly moving across the sky, completing a revolution of the
      earth approximately every 1.5 hours. While our ground stations are spread
      across the globe to ensure maximum coverage, there will still be occasions
      in which the satellite will be out of the reach of our extensive ground
      station network and thus be offline. For that reason the Cryptosat service
      caches the latest transmissions from the satellite and makes them
      accessible via the Cryptosat API. Responses to most API calls will
      contain a timestamp indicating when the transmission from the satellite,
      on which the response is based, was received.
    </p>
    <p>
      The online status of the Satelitte is displayed visually on the map.
      A green satellite indicates the satellite is online whereas a a red
      satellite is offline. You can also toggle the coverage layer to visualize
      the coverage provided by our ground station network. Whenever the
      satellite enters the covered regions it will turn green and whenever the
      satellite leaves the covered region it will turn red.
    </p>
  </div>
);

export default content
