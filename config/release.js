/* jshint node:true */
// var RSVP = require('rsvp');

// For details on each option run `ember help release`
module.exports = {
  remote: 'git@github.com:LucasHill/ember-print-this.git',
  annotation: "Release %@",
  message: "Bumped version to %@",
  manifest: [ 'package.json', 'bower.json' ],
  publish: true,
  prerelease: true,
  format: 'YYYY-MM-DD',
  timezone: 'UTC'
};
