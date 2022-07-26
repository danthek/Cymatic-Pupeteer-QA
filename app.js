/* let incidents = require('./launchers/incidents'); */
let users = require('./launchers/users');

let styles = {
  // Styles applied to stdout
  all: 'red', // Overall style applied to everything
  label: 'underline', // Inspection labels, like 'array' in `array: [1, 2, 3]`
  other: 'inverted', // Objects which don't have a literal representation, such as functions
  key: 'bold', // The keys in object literals, like 'a' in `{a: 1}`
  special: 'grey', // null, undefined...
  string: 'green',
  number: 'magenta',
  bool: 'blue', // true false
  regexp: 'green',
};
var inspect = require('eyes').inspector({ styles });

(async () => {
  Promise.allSettled([
    users.start(),
    /*     incidents.start() */
  ]).then((success) => inspect(success), console.error.bind(console));
})();
