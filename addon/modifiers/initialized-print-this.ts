import { modifier } from 'ember-modifier';

export default modifier(function initializedPrintThis(
  element, [callback]: [(element: Element) => void]
) {
  callback(element);
});
