#ifndef __UINPUT_H__
#define __UINPUT_H__

namespace uinput {
  extern __u16 KEY_CODES[];
  extern size_t KEY_CODES_SIZE;

  V8_METHOD(InitDevice);
  V8_METHOD(DeinitDevice);
  V8_METHOD(WriteEvent);
}

#endif
