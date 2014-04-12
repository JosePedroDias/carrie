# purpose

Although the raspberry pi is compact and works without peripherals, one needs them to input data such as keypresses and mouse movements. 

We propose to build an app which is twofold:

- a server running in raspi, listening to carrie's input messages;
- a web client running in html/css/js displaying keyboard/mouse/joystick and converting user generated events into the server's service.

The purpose is for one to be allowed to interact to raspi with your mobile device, without any real keyboard or mouse attached to the raspi.

(we assume the wifi dongle to be attached to the raspi for convenience)

Public repos for the [Carrie project](https://codebits.eu/intra/s/project/487) in the Codebits VII coding competition.




# details

* We've created C code to able to make use of ioctrl. (thx igor!)
* We've used node-gyp to export the former interface to node.js (thx luis!)
* We've created an HTTP/WS server to serve the virtual keyboard and listen to its events via websockets
* We've mapped the window pt_PT keyboard layout to linux events
