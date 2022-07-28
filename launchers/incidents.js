const puppeteer = require('puppeteer');

let xss = require('../incidents/xss');
let sql = require('../incidents/sql');
let html = require('../incidents/html');
let cors = require('../incidents/cors');

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
