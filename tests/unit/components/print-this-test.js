import { moduleForComponent, test } from 'ember-qunit';
import sinon from 'sinon';

moduleForComponent('print-this', 'Unit | Component | print this', {
  needs: ['service:printThis'],
  unit: true
});

test('it prints when doPrint action called', function(assert) {
  const printSpy = sinon.spy();

  const component = this.subject({
    _print: printSpy
  });

  component.send('doPrint');
  assert.equal(printSpy.callCount, 1);
});

test('it calls print on element insert if auto print true', function(assert) {
  const printSpy = sinon.spy();

  const component = this.subject({
    autoPrint: true,
    _print: printSpy
  });

  component.didInsertElement();
  assert.equal(printSpy.callCount, 1);
});

test('it does not print on element insert if auto print false (default)', function(assert) {
  const printSpy = sinon.spy();

  const component = this.subject({
    _print: printSpy
  });

  component.didInsertElement();
  assert.equal(printSpy.callCount, 0);
});

test('it calls service with correct default params on print', function(assert) {
  const printThisSpy = sinon.spy();
  const component = this.subject({
    printThis: { print: printThisSpy }
  });

  component._print();

  assert.equal(printThisSpy.callCount, 1);
  assert.equal(printThisSpy.args[0][0], '.content__printThis');
  assert.deepEqual(printThisSpy.args[0][1], {});
});

test('it uses passed in options on print', function(assert) {
  const printThisSpy = sinon.spy();
  const options = { foo: 'bar' };

  const component = this.subject({
    printThis: { print: printThisSpy },
    options,
  });

  component._print();

  assert.equal(printThisSpy.callCount, 1);
  assert.equal(printThisSpy.args[0][0], '.content__printThis');
  assert.deepEqual(printThisSpy.args[0][1], options);
});

test('it uses passed in selector on print', function(assert) {
  const printThisSpy = sinon.spy();
  const printSelector = 'foo';

  const component = this.subject({
    printThis: { print: printThisSpy },
    printSelector,
  });

  component._print();

  assert.equal(printThisSpy.callCount, 1);
  assert.equal(printThisSpy.args[0][0], printSelector);
  assert.deepEqual(printThisSpy.args[0][1], {});
});
