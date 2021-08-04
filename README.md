# Cryptosat Tutorial

This repository contains the code for a tutorial demonstrating how to use the Cryptosat API.

## Development

### Installation

To install the project dependencies first run:

    yarn install
    
### Testing
    
cd in to the project directory and run:

    yarn start

to runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deployment

To compile the app run:

    yarn build
    
This will create a directory called `build` in the project which can be served statically over the web. Once the command terminates you can run

    yarn global add serve
    serve -s build
  
To view it in a browser.

