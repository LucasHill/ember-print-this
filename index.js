'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    app.import('vendor/printThis.js');
  },

  treeForVendor(vendorTree) {
    var printThisTree = new Funnel(
      path.dirname(require.resolve('print-this/printThis.js')),
      {
        files: ['printThis.js'],
      }
    );

    printThisTree = map(
      printThisTree,
      (content) => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return vendorTree
      ? new MergeTrees([vendorTree, printThisTree])
      : printThisTree;
  },
};
