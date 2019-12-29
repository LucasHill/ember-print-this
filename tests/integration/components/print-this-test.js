import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

module('Integration | Component | print this', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the content of the block', async function(assert) {

    await render(hbs`{{print-this}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#print-this}}
        template block text
      {{/print-this}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });

  test('it auto prints the block template if specified', async function(assert) {
    const printThisSpy = sinon.spy();
    this.set('printThis', {
      print: printThisSpy
    });
    
    await render(hbs`
      {{#print-this autoPrint=true printThis=printThis}}
        <p>Some block stuff</p>
      {{/print-this}}
    `);

    assert.equal(printThisSpy.callCount, 1, 'Print this spy is called once');
  });

  test('it does not auto print if not specified', async function(assert) {
    const printThisSpy = sinon.spy();
    this.set('printThis', {
      print: printThisSpy
    });

    await render(hbs`
      {{#print-this printThis=printThis}}
        <p>Some block stuff</p>
      {{/print-this}}
    `);

    assert.equal(printThisSpy.callCount, 0, 'Print this spy is called once');
  });

  test('it can call print from yielded action', async function(assert) {
    const printThisSpy = sinon.spy();
    this.set('printThis', {
      print: printThisSpy
    });

    await render(hbs`
      {{#print-this printThis=printThis as |doPrint|}}
        <p>Some block stuff</p>
        <button onclick={{doPrint}}>Heyo</button>
      {{/print-this}}
    `);

    await click('button');
    assert.equal(printThisSpy.callCount, 1, 'Print this spy is called once');
  });
});
