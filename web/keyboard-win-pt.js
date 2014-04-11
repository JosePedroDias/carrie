
/*
at this level, each key has:
	- c code it send as its identify when used
	- l label to display in the canvas
	- fw factor of width usage: relative size of the key relating to its neighbors
*/

var fws = [
	[1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 13

	[1,    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4], // 14
	[1.5,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.25], // 14
	[1.8,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1], // 14
	[1.5,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.3], // 13
	[1, 1, 7, 1, 1] // 5
];

var ls = [
	['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'], //13

	['\\\n|', '1\n!', '2\n"\n@', '3\n#\n£', '4\n$', '5\n%', '6\n&', '7\n/\n{', '8\n(\n[', '9\n)\n]', '0\n=\n}', '\'\n?', '«\n»', 'bksp'], // 14
	['→', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '+\n*', '´\n`', '↵'], // 14
	['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'º\nª', '~\n^', ' '], // 14
	['⇑', '<\n>', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',\n;', '.\n:', '-\n_', '⇑'], // 13
	['ctr', 'alt', ' ', 'alt gr', 'ctr'] // 5
];

var cs = [
	['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'], // 13

	['\'', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\'', '<', 'bksp'], // 14
	['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '+', '\'', 'ret'], // 14
	['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç', 'º', '~', 'ret'], // 14
	['sh', '<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-', 'sh'], // 13
	['ctr', 'alt', 'spc', 'alt', 'ctr'] // 5
];


var carrieKeyboardProfile = {
	codes:        cs,
	labels:       ls,
	factorWidths: fws
};