let staticIncidents = require('./launchers/staticIncidents');
let clientSiteAuth = require('./launchers/clientSiteAuth');
let Storelaunchers = require('./launchers/storeLaunchers');
let styles = {
  // Styles applied to stdout
  all: 'yellow', // Overall style applied to everything
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

// change true/false in order to run login/registration or both
// if setregister is false, the login component will use: user: user & password: password
Storelaunchers.setLogin(true);
Storelaunchers.setRegister(false);
(async () => {
  //Comment/uncomment the desired launchers as needed
  Promise.allSettled([
    clientSiteAuth.start(),
    /* staticIncidents.start(), */
  ]).then((success) => inspect(success), console.error.bind(console));
})();
