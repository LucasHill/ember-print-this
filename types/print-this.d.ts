type PrintThisOptions = {
  debug?: boolean,               // show the iframe for debugging
  importCSS?: boolean,            // import parent page css
  importStyle?: boolean,         // import style tags
  printContainer?: boolean,       // print outer container/$.selector
  loadCSS?: string | string[],                // path to additional css file - use an array [] for multiple
  pageTitle?: string,              // add title to print page
  removeInline?: boolean,        // remove inline styles from print elements
  removeInlineSelector?: string,  // custom selectors to filter inline styles. removeInline must be boolean
  printDelay?: number,            // variable print delay
  header?: string,               // prefix to html
  footer?: string,               // postfix to html
  base?: boolean | string,                // preserve the BASE tag or accept a string for the URL
  formValues?: boolean,           // preserve input/form values
  canvas?: boolean,              // copy canvas content
  doctypeString?: string,       // enter a different doctype for older markup
  removeScripts?: boolean,       // remove script tags from print content
  copyTagClasses?: boolean,      // copy classes from the html & body tag
  beforePrintEvent?: Function,     // function for printEvent in iframe
  beforePrint?: Function,          // function called before iframe is filled
  afterPrint?: Function            // function called before iframe is removed
}

interface JQuery {
  printThis(options?: PrintThisOptions): void
}