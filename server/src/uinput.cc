#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

#include <linux/input.h>
#include <linux/uinput.h>

#include <node.h>
#include <node_buffer.h>
#include <v8.h>

#include <errno.h>
#include <sys/ioctl.h>

#include "v8_helpers.h"

#include "uinput.h"

using namespace v8;
using namespace node;

void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "initDevice" , uinput::InitDevice);
  NODE_SET_METHOD(target, "deinitDevice" , uinput::DeinitDevice);
  NODE_SET_METHOD(target, "writeEvent" , uinput::WriteEvent);
}

NODE_MODULE(uinput, init)

namespace uinput {

__u16 KEY_CODES[] = {
  KEY_ESC,
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_4,
  KEY_5,
  KEY_6,
  KEY_7,
  KEY_8,
  KEY_9,
  KEY_0,
  KEY_MINUS,
  KEY_EQUAL,
  KEY_BACKSPACE,
  KEY_TAB,
  KEY_Q,
  KEY_W,
  KEY_E,
  KEY_R,
  KEY_T,
  KEY_Y,
  KEY_U,
  KEY_I,
  KEY_O,
  KEY_P,
  KEY_LEFTBRACE,
  KEY_RIGHTBRACE,
  KEY_ENTER,
  KEY_LEFTCTRL,
  KEY_A,
  KEY_S,
  KEY_D,
  KEY_F,
  KEY_G,
  KEY_H,
  KEY_J,
  KEY_K,
  KEY_L,
  KEY_SEMICOLON,
  KEY_APOSTROPHE,
  KEY_GRAVE,
  KEY_LEFTSHIFT,
  KEY_BACKSLASH,
  KEY_Z,
  KEY_X,
  KEY_C,
  KEY_V,
  KEY_B,
  KEY_N,
  KEY_M,
  KEY_COMMA,
  KEY_DOT,
  KEY_SLASH,
  KEY_RIGHTSHIFT,
  KEY_KPASTERISK,
  KEY_LEFTALT,
  KEY_SPACE,
  KEY_CAPSLOCK,
  KEY_F1,
  KEY_F2,
  KEY_F3,
  KEY_F4,
  KEY_F5,
  KEY_F6,
  KEY_F7,
  KEY_F8,
  KEY_F9,
  KEY_F10,
  KEY_NUMLOCK,
  KEY_SCROLLLOCK,
  KEY_KP7,
  KEY_KP8,
  KEY_KP9,
  KEY_KPMINUS,
  KEY_KP4,
  KEY_KP5,
  KEY_KP6,
  KEY_KPPLUS,
  KEY_KP1,
  KEY_KP2,
  KEY_KP3,
  KEY_KP0,
  KEY_KPDOT,
  KEY_ZENKAKUHANKAKU,
  KEY_102ND,
  KEY_F11,
  KEY_F12,
  KEY_RO,
  KEY_KATAKANA,
  KEY_HIRAGANA,
  KEY_HENKAN,
  KEY_KATAKANAHIRAGANA,
  KEY_MUHENKAN,
  KEY_KPJPCOMMA,
  KEY_KPENTER,
  KEY_RIGHTCTRL,
  KEY_KPSLASH,
  KEY_SYSRQ,
  KEY_RIGHTALT,
  KEY_HOME,
  KEY_UP,
  KEY_PAGEUP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_END,
  KEY_DOWN,
  KEY_PAGEDOWN,
  KEY_INSERT,
  KEY_DELETE,
  KEY_MACRO,
  KEY_MUTE,
  KEY_VOLUMEDOWN,
  KEY_VOLUMEUP,
  KEY_POWER,
  KEY_KPEQUAL,
  KEY_KPPLUSMINUS,
  KEY_PAUSE,
  KEY_KPCOMMA,
  KEY_HANGUEL,
  KEY_HANJA,
  KEY_YEN,
  KEY_LEFTMETA,
  KEY_RIGHTMETA,
  KEY_COMPOSE,
  KEY_STOP,
  KEY_CALC,
  KEY_SLEEP,
  KEY_WAKEUP,
  KEY_MAIL,
  KEY_BOOKMARKS,
  KEY_COMPUTER,
  KEY_BACK,
  KEY_FORWARD,
  KEY_NEXTSONG,
  KEY_PLAYPAUSE,
  KEY_PREVIOUSSONG,
  KEY_STOPCD,
  KEY_HOMEPAGE,
  KEY_REFRESH,
  KEY_F13,
  KEY_F14,
  KEY_F15,
  KEY_SEARCH,
  KEY_MEDIA,
};

size_t KEY_CODES_SIZE = sizeof(KEY_CODES) / sizeof(__u16);

Handle<Value> InitDevice(const Arguments& args) {
  HandleScope scope;

  // TODO Handle errors
  int fd = args[0]->Int32Value();
  int ret;

  if(fd < 0) {
    perror("evdev create: can\'t open uinput");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t open uinput")));
  }

  ret = ioctl(fd, UI_SET_EVBIT, EV_KEY);
  if (ret < 0) {
    perror("evdev create: can\'t set EV_KEY");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t set EV_KEY")));
  }

  unsigned int i;
  for (i = 0; i < KEY_CODES_SIZE; ++i) {
    ret = ioctl(fd, UI_SET_KEYBIT, KEY_CODES[i]);
    if (ret < 0) {
      perror("evdev create: can\'t set KEY");
      V8_THROW(Exception::TypeError(String::New("evdev create: can\'t set KEY")));
    }
  }

  struct uinput_user_dev uidev;
  memset(&uidev, 0, sizeof(uidev));

  snprintf(uidev.name, UINPUT_MAX_NAME_SIZE, "uinput-sample");
  uidev.id.bustype = BUS_USB;
  uidev.id.vendor  = 0x1234;
  uidev.id.product = 0xfedc;
  uidev.id.version = 1;

  ret = write(fd, &uidev, sizeof(uidev));
  if (ret < 0) {
    perror("evdev create: can\'t write the device info");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t write the device info")));
  }

  ret = ioctl(fd, UI_DEV_CREATE);
  if (ret < 0) {
    perror("evdev create: can\'t create the device");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t create the device")));
  }

  V8_RETURN(Undefined());
}

Handle<Value> DeinitDevice(const Arguments& args) {
  HandleScope scope;

  int fd = args[0]->Int32Value();
  int ret;

  ret = ioctl(fd, UI_DEV_DESTROY);
  if (ret < 0) {
    perror("evdev create: can\'t destroy the device");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t destroy the device")));
  }

  V8_RETURN(Undefined());
}

Handle<Value> WriteEvent(const Arguments& args) {
  HandleScope scope;

  int fd      = args[0]->Int32Value();
  __u16 code  = (__u16) args[1]->Int32Value();
  __u16 value = (__u16) args[2]->Int32Value();

  int ret;
  struct input_event ev;
  memset(&ev, 0, sizeof(ev));
  ev.type = EV_KEY;
  ev.code = code;
  ev.value = value;

  ret = write(fd, &ev, sizeof(ev));
  if (ret < 0) {
    perror("evdev create: can\'t send event");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t send event")));
  }

  ev.type = EV_SYN;
  ev.code = 0;
  ev.value = 0;
  ret = write(fd, &ev, sizeof(ev));
  if (ret < 0) {
    perror("evdev create: can\'t send event");
    V8_THROW(Exception::TypeError(String::New("evdev create: can\'t send event")));
  }

  V8_RETURN(scope.Close(Uint32::New(0)));
}

} // namespace
