const puppeteer = require('puppeteer');

let xss = require('../static-incidents/xss');
let sql = require('../static-incidents/sql');
let html = require('../static-incidents/html');
let cors = require('../static-incidents/cors');

// loop the static incidents functions the desire times passing "loops" props.
function staticLoops(browser, loops) {
  const myPromise = [];
  for (let index = 0; index < loops; index++) {
    myPromise.push(
      new Promise((resolve, reject) => {
        xss(browser).then(resolve);
      }),
      new Promise((resolve, reject) => {
        sql(browser).then(resolve);
      }),
      new Promise((resolve, reject) => {
        html(browser).then(resolve);
      }),
      new Promise((resolve, reject) => {
        cors(browser).then(resolve);
      })
    );
  }

  return myPromise;
}

module.exports.start = async function () {
  const browser = await puppeteer.launch({ headless: true });

  let result = await Promise.allSettled(staticLoops(browser, (loops = 5)));

  await browser.close();
  return result;
};
