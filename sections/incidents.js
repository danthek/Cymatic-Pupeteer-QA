const puppeteer = require('puppeteer');

let xss  = require('../incidents/xss');
let sql  = require('../incidents/sql');
let html = require('../incidents/html');

module.exports.start = async function(){
  const browser = await puppeteer.launch({headless: false});

  let result =  await Promise.allSettled([
    xss(browser),
    sql(browser),
    html(browser)
  ]);

  await browser.close();
  return result;
};
