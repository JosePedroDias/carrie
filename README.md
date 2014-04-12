# purpose

Although the raspberry pi is compact and works without peripherals, one needs them to input data such as keypresses and mouse movements. 

We propose to build an app which is twofold:

- a server running in raspi, listening to carrie's input messages;
- a web client running in html/css/js displaying keyboard/mouse/joystick and converting user generated events into the server's service.

The purpose is for one to be allowed to interact to raspi with your mobile device, without any real keyboard or mouse attached to the raspi.

(we assume the wifi dongle to be attached to the raspi for convenience)

Public repos for the [Carrie project](https://codebits.eu/intra/s/project/487) in the Codebits VII coding competition.



# how to install

1) properly install [node.js](http://nodejs.org) into your raspian raspi

2) clone our repos

    git clone git@github.com:JosePedroDias/carrie.git

3) install our dependecies

    npm install

4) compile our uinput C interface via node-gyp

    node-gyp TODO

5) check your raspi's IP address in the wireless interface. you'll need it for step 7

    ifconfig

5) fire up the server (requires sudo because it inject kbd events into the kernel)

    cd server
    sudo node server.js

6) visit `http://<RASPI_IP_HERE>:3000/index.html` on a touch device in the same wireless interface



# details

* We've created C code to able to make use of ioctrl. (thx igor!)
* We've used node-gyp to export the former interface to node.js (thx luis!)
* We've created an HTTP/WS server to serve the virtual keyboard and listen to its events via websockets
* We've mapped the window pt_PT keyboard layout to linux events
