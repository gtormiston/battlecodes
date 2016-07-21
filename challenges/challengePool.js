/* jshint ignore:start */

'1) Write a function that works out number of seconds in seven years';

var testCases = [ {testInput: nil, expectedOutput: 220752000}];

'2) Write a function that returns an absolute cubed number no higher than 1000';

var testCases = [ {testInput: 1, expectedOutput: 1},
                  {testInput: 2, expectedOutput: 8},
                  {testInput: 3, expectedOutput: 27},
                  {testInput: 10, expectedOutput: 1000},
                  {testInput: 11, expectedOutput: 'Fail!'},
                  {testInput: -5, expectedOutput: 125},
                  {testInput: -11, expectedOutput: 'Fail'}];

'3) Write a function that returns the same number minus 1 and a half';

var testCases = [ {testInput: 1, expectedOutput: -0.5},
                  {testInput: -7, expectedOutput: -8.5},
                  {testInput: -20, expectedOutput: -21.5},
                  {testInput: 70, expectedOutput: 68.5},
                  {testInput: 10, expectedOutput: 8.5}];

'4) Write a function that converts a number to a string and rounds down to two decimal places';

var testCases = [ {testInput: 3, expectedOutput: '3.00'},
                  {testInput: -10, expectedOutput: '-10.00'},
                  {testInput: 18.29834747, expectedOutput: '18.30'},
                  {testInput: -15.39497439, expectedOutput: '-15.39'},
                  {testInput: 22.4999999999999, expectedOutput: '22.00'},
                  {testInput: Infinity, expectedOutput: 'NaN'},
                  {testInput: -Infinity, expectedOutput: 'NaN'}];

'5) Write a function that calculates the lowest common denominator between a given number and nine';

var testCases = [ {testInput: 1, expectedOutput: 0},
                  {testInput: 10, expectedOutput: 90},
                  {testInput: 8, expectedOutput: 72},
                  {testInput: 90, expectedOutput: 90},
                  {testInput: -2, expectedOutput: 18}];

'6) One plus one iiiis ???';

var testCases = [ {testInput: 1, expectedOutput: 2}];

'7) Write a function that calculates a number squared plus eight times five hundred and eight divided by three point five plus nine rounded to three decimal places...plus one (in this order, so ignoring BODMAS)';

var testCases = [ {testInput: 5, expectedOutput: 4799.71},
                  {testInput: 50, expectedOutput: 364028.29},
                  {testInput: 38, expectedOutput: 210757.43},
                  {testInput: 3579, expectedOutput: 1859171007.71}];

'8) Write a function that calculates the greatest common divisor of a given number and nine hundred';

var testCases = [ {testInput: 8, expectedOutput: 4},
                  {testInput: 9, expectedOutput: 9},
                  {testInput: 10, expectedOutput: 10},
                  {testInput: 21, expectedOutput: 3},
                  {testInput: 54, expectedOutput: 18},
                  {testInput: 8, expectedOutput: 4},
                  {testInput: 102, expectedOutput: 6},
                  {testInput: 312, expectedOutput: 12},
                  {testInput: 456, expectedOutput: 12},
                  {testInput: 8, expectedOutput: 4},
                  {testInput: 34974, expectedOutput: 18},
                  {testInput: 11, expectedOutput: 1}];

'9) Write a function that returns the square root of a given number (if not a whole number then to 2 decimal places)';

var testCases = [ {testInput: 81, expectedOutput: 9},
                  {testInput: 4, expectedOutput: 2},
                  {testInput: 32, expectedOutput: 5.66},
                  {testInput: 80, expectedOutput: 8.94},
                  {testInput: 64, expectedOutput: 8},
                  {testInput: 121, expectedOutput: 11},
                  {testInput: 45678, expectedOutput: 213.72},
                  {testInput: 50, expectedOutput: 7.07},
                  {testInput: 1, expectedOutput: 1},
                  {testInput: 0, expectedOutput: 0}];

'10) One plus one iiiis ???';

var testCases = [ {testInput: 1, expectedOutput: 2}];

'10) Write a function that takes a number y, creates a (y x y) cube, and returns the number of cubes within it, minus the top layer of cubes';

var testCases = [ {testInput: 1, expectedOutput: 0},
                  {testInput: 2, expectedOutput: 4},
                  {testInput: 3, expectedOutput: 18},
                  {testInput: 657, expectedOutput: 283161744},
                  {testInput: 21, expectedOutput: 8820},
                  {testInput: 15, expectedOutput: 3150}];
