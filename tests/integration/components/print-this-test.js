import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

moduleForComponent('print-this', 'Integration | Component | print this', {
  integration: true
});

test('it renders the content of the block', function(assert) {

  this.render(hbs`{{print-this}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#print-this}}
      template block text
    {{/print-this}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it auto prints the block template if specified', function(assert) {
  const printThisSpy = sinon.spy();
  this.set('printThis', {
    print: printThisSpy
  });
  
  this.render(hbs`
    {{#print-this autoPrint=true printThis=printThis}}
      <p>Some block stuff</p>
    {{/print-this}}
  `);

  assert.equal(printThisSpy.callCount, 1, 'Print this spy is called once');
});

test('it does not auto print if not specified', function(assert) {
  const printThisSpy = sinon.spy();
  this.set('printThis', {
    print: printThisSpy
  });

  this.render(hbs`
    {{#print-this printThis=printThis}}
      <p>Some block stuff</p>
    {{/print-this}}
  `);

  assert.equal(printThisSpy.callCount, 0, 'Print this spy is called once');
});

test('it can call print from yielded action', function(assert) {
  const printThisSpy = sinon.spy();
  this.set('printThis', {
    print: printThisSpy
  });

  this.render(hbs`
    {{#print-this printThis=printThis as |doPrint|}}
      <p>Some block stuff</p>
      <button onclick={{doPrint}}>Heyo</button>
    {{/print-this}}
  `);

  this.$('button').click();
  assert.equal(printThisSpy.callCount, 1, 'Print this spy is called once');
});
