fs     = require('fs'),
    uinput = require('../build/Release/uinput.node');

fs.open('/dev/uinput', 'a', function (err, fd) {
  if (err) {
    console.log(err);
    return;
  }

  uinput.initDevice(fd);

  var args = process.argv.slice();
  args.shift(); // node
  args.shift(); // source file
  //console.log(args);

  var key = args[0] === undefined ?   30 : parseInt(args[0], 10);
  var dur = args[1] === undefined ? 1000 : parseInt(args[1], 10);

  setTimeout(function() {
    uinput.writeEvent(fd, key, 1);

    setTimeout(function () {
      uinput.writeEvent(fd, key, 0);
      uinput.deinitDevice(fd);
      fs.close(fd);
    }, dur);
  }, 100);
});
