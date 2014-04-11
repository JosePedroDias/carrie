
/*
at this level, each key has:
	- c code it send as its identify when used
	- l label to display in the canvas
	- fw factor of width usage: relative size of the key relating to its neighbors
*/

var fws = [
	[1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.25],
	[1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.9],
	[2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
	[1.5, 1.5, 7, 1.5, 1.5]
];

var ls = [
	['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'bksp'],
	['a/1', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ret'],
	['sh', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'sh'],
	['ctr', 'alt', 'spc', 'alt', 'ctr']
];

var cs = [
	['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'bksp'],
	['a/1', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ret'],
	['sh', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', 'sh'],
	['ctr', 'alt', 'spc', 'alt', 'ctr']
];


var carrieKeyboardProfile = {
	codes:        cs,
	labels:       ls,
	factorWidths: fws
};
