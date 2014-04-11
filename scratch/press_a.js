var fs=require('fs'),
    uinput=require('../build/Release/uinput.node');

fs.open('/dev/uinput', 'a', function (err, fd) {
  if (err) {
    console.log(err);
    return;
  }

  uinput.initDevice(fd);

  var xxx = 30;

  setTimeout(function () {
    uinput.writeEvent(fd, xxx, 1);

    setTimeout(function () {
      uinput.writeEvent(fd, xxx, 0);

      setTimeout(function () {
        uinput.deinitDevice(fd);

        fs.close(fd);
      }, 5000);
    }, 5000);
  }, 5000);
});
