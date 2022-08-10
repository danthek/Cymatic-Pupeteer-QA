const puppeteer = require('puppeteer');
let login = require('../scenarios/client-site/login');
let register = require('../scenarios/client-site/register');
let Storelaunchers = require('./storeLaunchers');

// create new promises : Automated New user register & login
// loop the login & register functions the desire times passing "loops" props.
function createPromise(
  browser,
  registerTest,
  registerLoops,
  loginTest,
  loginLoops
) {
  const myPromise = [];
  if (loginTest && registerTest) {
    for (let index = 0; index <= registerLoops; index++) {
      myPromise.push(
        new Promise((resolve, reject) => {
          register(browser).then(resolve);
        })
      );
    }

    for (let index = 0; index <= loginLoops; index++) {
      myPromise.push(
        new Promise((resolve, reject) => {
          login(browser).then(resolve);
        })
      );
    }
  } else if (loginTest) {
    for (let index = 0; index <= loginLoops; index++) {
      myPromise.push(
        new Promise((resolve, reject) => {
          login(browser).then(resolve);
        })
      );
    }
  } else {
    for (let index = 0; index <= registerLoops; index++) {
      myPromise.push(
        new Promise((resolve, reject) => {
          register(browser).then(resolve);
        })
      );
    }
  }

  return myPromise;
}
module.exports.start = async function () {
  var loginTest = Storelaunchers.getlogin();
  var registerTest = Storelaunchers.getRegister();
  const browser = await puppeteer.launch({ headless: true });
  let result = await Promise.allSettled(
    createPromise(
      browser,
      registerTest,
      (registerLoops = 0),
      loginTest,
      (loginLoops = 5)
    )
  );
  await browser.close();
  return result;
};
