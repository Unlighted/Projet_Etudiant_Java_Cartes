var reporter = require('nodeunit').reporters.nested;
//var reporter = require('nodeunit').reporters.tap;
//var reporter = require('nodeunit').reporters.verbose;


process.chdir("unit");
reporter.run(['testTweet.js']);