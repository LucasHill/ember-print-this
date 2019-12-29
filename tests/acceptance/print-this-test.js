import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';

module('Acceptance | print this', function(hooks) {
  setupApplicationTest(hooks);

  test('it works end to end', async function(assert) {
    const stub = sinon.stub(window.$.fn, 'printThis');
    await visit('/');
    await click('.btn-1');
    assert.equal(stub.callCount, 1);
    stub.restore();
  });
});
