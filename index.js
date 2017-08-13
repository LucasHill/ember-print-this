/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-print-this',

  included(app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    app.import('vendor/printThis.js');
  },

  treeForVendor(vendorTree) {
    var printThisTree = new Funnel(path.dirname(require.resolve('print-this/printThis.js')), {
      files: ['printThis.js'],
    });

    return new MergeTrees([vendorTree, printThisTree]);
  },
};
