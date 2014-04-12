
/*
at this level, each key has:
  - c code it send as its identify when used
  - l label to display in the canvas
  - fw factor of width usage: relative size of the key relating to its neighbors
*/

var u = undefined;
//var a = 1;
var b = 0.9;

var fws = [
  [1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 1],
  [],
  [1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4,  1, 1, 1, 1, 1, 1, 1],
  [1.5,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.25, 1, 1, 1, 1, 1, 1, 1],
  [1.8,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1,  1, 1, 1, 1, 1, 1, 1],
  [1.3,  b, b, b, b, b, b, b, b, b, b, b, 2,     1, 1, 1, 1, 1, 1, 1],
  [1.5, 1.5, 7, 1.5, 1.5,                          1, 1, 1, 1, 1, 1, 1]
];

var ls = [
  ['esc', u, 'F1', 'F2', 'F3', 'F4', u, 'F5', 'F6', 'F7', 'F8', u, 'F9', 'F10', 'F11', 'F12', u, 'pr scr', 'scrl', 'pause'],
  [],
  ['\\\n|', '1\n!', '2\n"\n@', '3\n#\n£', '4\n$', '5\n%', '6\n&', '7\n/\n{', '8\n(\n[', '9\n)\n]', '0\n=\n}', '\'\n?', '«\n»', '←', 'ins', 'home', 'pg up', 'num',     '/',     '*',        '-'],
  ['→', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '+\n*', '´\n`', '↵',                                                      'del', 'end',  'pg dw', '7\nhome', '8\n↑',  '9\npg up', '+'],
  ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'º\nª', '~\n^', ' ',                                                     u,     u,       u   , '4\n←',    '5',     '6\n→',     '+'],
  ['⇑', '<\n>', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',\n;', '.\n:', '-\n_', '⇑',                                                       u,    '↑',      u   , '1\nend',  '2\n↓',  '3\npg dw', 'ret'],
  ['ctr', 'alt', ' ', 'alt gr', 'ctr' ,                                                                                              '←',   '↓',     '→'  , '0\nins',  '0\nins',   '.\ndel',   'ret']
];

var cs = [
  ['ESC', u, 'F1', 'F2', 'F3', 'F4', u, 'F5', 'F6', 'F7', 'F8', u, 'F9', 'F10', 'F11', 'F12', u, 'PRINT', 'SCROLLLOCK', 'NUMLOCK'],
  [],
  ['BACKSLASH', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'MINUS', 'GRAVE', 'BACKSPACE',              'INSERT',  'HOME',   'PAGEUP',    'NUMLOCK', 'KPSLASH', 'KPASTERISK', 'KPMINUS'],
  ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'EQUAL', 'RIGHTBRACE', 'ENTER',                   'DELETE',  'END',   'PAGEDOWN',   'KP7', 'KP8', 'KP9', 'KPPLUS'],
  ['CAPSLOCK', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'SEMICOLON', 'LEFTBRACE', 'APOSTROPHE', 'ENTER',  u,  u,   u,                       'KP4', 'KP5', 'KP6', 'KPPLUS'],
  ['LEFTSHIFT', '102ND', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'COMMA', 'DOT', 'SLASH', 'RIGHTSHIFT',            u,      'UP',  u,                 'KP1', 'KP2', 'KP3', 'KPENTER'],
  ['LEFTCTRL', 'LEFTALT', 'SPACE', 'RIGHTALT', 'RIGHTCTRL',                                                   'LEFT', 'DOWN',  'RIGHT',         'KP0', 'KP0', 'KPDOT', 'KPENTER']
];


// this layout works for /etc/default/keyboard pc105 pc mac
// TODO: GRAVE


var carrieKeyboardProfile = {
  codes:        cs,
  labels:       ls,
  factorWidths: fws
};
