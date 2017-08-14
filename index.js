/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-print-this',

  included(app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    app.import('vendor/printThis.js');
  },

  treeForVendor() {
    var printThisTree = new Funnel(path.dirname(require.resolve('print-this/printThis.js')), {
      files: ['printThis.js'],
    });

    return printThisTree;
  },
};
