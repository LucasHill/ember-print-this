import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';
import $ from 'jquery';

module('Acceptance | print this', function (hooks) {
  setupApplicationTest(hooks);

  test('it works end to end', async function (assert) {
    const stub = sinon.stub($.fn, 'printThis');
    await visit('/');
    await click('.btn-1');
    assert.strictEqual(stub.callCount, 1);
    stub.restore();
  });
});
