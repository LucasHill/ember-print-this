import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | initialized-print-this', function (hooks) {
  setupRenderingTest(hooks);

  test('it gives the element back to the callback on render', async function (assert) {
    assert.expect(1);

    this.set('callback', (elm: Element) => {
      assert.strictEqual(elm.tagName, 'PRINT-THIS');
    });

    await render(
      hbs`<print-this {{initialized-print-this this.callback}}></print-this>`
    );
  });
});
