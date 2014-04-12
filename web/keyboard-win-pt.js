
/*
at this level, each key has:
  - c code it send as its identify when used
  - l label to display in the canvas
  - fw factor of width usage: relative size of the key relating to its neighbors
*/

var fws = [
  [1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 13
  [],
  [1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4], // 14
  [1.5,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.25], // 14
  [1.8,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1], // 14
  [1.5,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3], // 13
  [1, 1, 7, 1, 1] // 5
];

var ls = [
  ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'], //13
  [],
  ['\\\n|', '1\n!', '2\n"\n@', '3\n#\n£', '4\n$', '5\n%', '6\n&', '7\n/\n{', '8\n(\n[', '9\n)\n]', '0\n=\n}', '\'\n?', '«\n»', 'bksp'], // 14
  ['→', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '+\n*', '´\n`', '↵'], // 14
  ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'º\nª', '~\n^', ' '], // 14
  ['⇑', '<\n>', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',\n;', '.\n:', '-\n_', '⇑'], // 13
  ['ctr', 'alt', ' ', 'alt gr', 'ctr'] // 5
];

var cs = [
  ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'], // 13
  [],
  ['BACKSLASH', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'MINUS', 'GRAVE', 'BACKSPACE'], // 14
  ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'EQUAL', 'RIGHTBRACE', 'ENTER'], // 14
  ['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'SEMICOLON', 'LEFTBRACE', 'APOSTROPHE', 'ENTER'], // 14
  ['LEFTSHIFT', '102ND', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'COMMA', 'DOT', 'SLASH', 'RIGHTSHIFT'], // 13
  ['LEFTCTRL', 'LEFTALT', 'SPACE', 'RIGHTALT', 'RIGHTCTRL'] // 5
];


// this layout works for /etc/default/keyboard pc105 pc mac
// TODO: GRAVE


var carrieKeyboardProfile = {
  codes:        cs,
  labels:       ls,
  factorWidths: fws
};
