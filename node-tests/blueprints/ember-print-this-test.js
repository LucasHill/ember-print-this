'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;

describe('Acceptance: ember generate and destroy ember-print-this', function() {
  setupTestHooks(this);

  it('installs printThis bower package', function() {
    var args = ['ember-print-this', 'foo'];
    var printThisDep = 'bower_components/printThis/printThis.js';

    return emberNew()
      .then(() => emberGenerateDestroy(args, (file) => {
        expect(file(printThisDep))
          .to.contain('file contents to match')
          .to.contain('more file contents\n');
      }));
  });
});
