const content = (props) => (
  <div >
    <div className="desktop-content">
      <h2>Welcome</h2>
      <p>
        Welcome to the Cryptosim tutorial. This tutorial will teach you how to
        use cryptosim - the cryptosat simulator. The cryptosat simulator is
        designed to emulate the workings of a live satellite and demonstrate the
        functionality of the Cryptosat API.
      </p>
      <p>
        On the background of the screen there is a map visualizing the location of the
        cryptosat and the ground stations that we use to communicate with it.
        Ground stations appear as blue dots whereas the cryptosat will
        appear as a pulsing red or green circle.
      </p>
      <p>
        The right-side panel is a javascript console that you can use to type in
        commands. Throughout this tutorial you will find code snippets that
        showcase commands for interacting with the Cryptosat API. You are welcome
        to type the commands into the console and see the outcome for yourself.
      </p>
    </div>

    <div className="mobile-content">
      <h2>Welcome</h2>
      <p>
        Welcome to the Cryptosim tutorial. This tutorial will teach you how to
        use cryptosim - the cryptosat simulator. The cryptosat simulator is
        designed to emulate the workings of a live satellite and demonstrate the
        functionality of the Cryptosat API.
      </p>
      <p>
        Throughout this tutorial you will find code snippets that
        showcase commands for interacting with the Cryptosat API. You are welcome
        to type the commands into the console on a desktop and see the outcome for yourself.
      </p>
    </div>
  </div>
);

export default content;
