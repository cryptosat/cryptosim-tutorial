const content = (
  <div>
    <h2>Communication Windows</h2>
    <p>
      Cryptosats are designed to be launched at low earth orbit. This means
      they are constantly moving across the sky, completing a revolution of the
      earth approximately every 90 minutes. While our ground stations are spread
      across the globe to ensure maximum coverage, there will still be occasions
      in which the cryptosat will be out of the reach of our extensive ground
      station network and thus be offline. For that reason the Cryptosat service
      caches the latest transmissions from the satellite and makes them
      accessible via the Cryptosat API. Responses to most API calls will
      contain a timestamp indicating when the transmission from the cryptosat,
      on which the response is based, was received.
    </p>
    <p>
      The online status of the cryptosat is displayed visually on the map.
      A green circle indicates the cryptosat is online whereas a red
      circle inidiates the cryptosat is offline. Whenever the cryptosat enters
      the covered regions it will turn green and whenever it leaves the covered
      region it will turn red.
    </p>
  </div>
);

export default content
