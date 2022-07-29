const puppeteer = require('puppeteer');

let xss = require('../static-incidents/xss');
let sql = require('../static-incidents/sql');
let html = require('../static-incidents/html');
let cors = require('../static-incidents/cors');

module.exports.start = async function () {
  const browser = await puppeteer.launch({ headless: true });

  let result = await Promise.allSettled([
    xss(browser),
    sql(browser),
    html(browser),
    cors(browser),
  ]);

  await browser.close();
  return result;
};
