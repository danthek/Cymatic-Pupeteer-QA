const puppeteer = require('puppeteer');
let login = require('../scenarios/client-site/login');
let register = require('../scenarios/client-site/register');
let Storelaunchers = require('./storeLaunchers');

// create new promises : Automated New user register & login
// loop the login & register functions the desire times passing "loops" props.
function createPromise(browser, registerTest, loginTest, loops) {
  const myPromise = [];

  for (let index = 0; index <= loops; index++) {
    myPromise.push(
      loginTest && registerTest
        ? (new Promise((resolve, reject) => {
            register(browser).then(resolve);
          }),
          new Promise((resolve, reject) => {
            login(browser).then(resolve);
          }))
        : new Promise((resolve, reject) => {
            login(browser).then(resolve);
          })
    );
  }
  return myPromise;
}
module.exports.start = async function () {
  var loginTest = Storelaunchers.getlogin();
  var registerTest = Storelaunchers.getRegister();
  const browser = await puppeteer.launch({ headless: false });
  let result = await Promise.allSettled(
    createPromise(browser, registerTest, loginTest, (loops = 1))
  );
  await browser.close();
  return result;
};
