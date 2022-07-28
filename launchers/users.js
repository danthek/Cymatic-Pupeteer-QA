const puppeteer = require('puppeteer');
let login = require('../scenarios/client-site/login');
let register = require('../scenarios/client-site/register');
let Store = require('../store');

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// create new promises , register new user 
//and loop the login function the desire times passing "loops" prop
////comment/uncomment  the register || Login components as needed
function createPromise(browser, finalUser, finalPass, loops) {
  const promesas = [];
  promesas.push(register(browser))
  for (let index = 0; index <= loops; index++) {
    promesas.push(new Promise((resolve, reject) => {
      login(browser/* , finalUser, finalPass */).then(resolve)
    }))
  }
  return promesas
}


module.exports.start = async function (finalUser, finalPass) {
  var finalUser = Store.getUser();
  var finalPass = Store.getPass();
  const browser = await puppeteer.launch({ headless: true });
  //Send (finalUser, finalPass) to login so it can use Register's component randomly 
  //generated Creds. Otherwise the login will use the default Dark Web Creds
  let result = await Promise.allSettled(createPromise(browser, finalUser, finalPass, 30));

  await browser.close();
  return result;
};

