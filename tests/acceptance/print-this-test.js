import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import sinon from 'sinon';

moduleForAcceptance('Acceptance | print this');

test('it works end to end', function(assert) {
  const stub = sinon.stub(window.$.fn, 'printThis');
  visit('/');
  andThen(() => {
    click('button');
  });
  
  andThen(() => {
    assert.equal(stub.callCount, 1);
    stub.restore();
  });
});
