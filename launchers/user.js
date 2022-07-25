const puppeteer = require('puppeteer');

/* let login = require('../scenarios/client-site/login'); */
let register = require('../scenarios/client-site/register');

module.exports.start = async function(){
  const browser = await puppeteer.launch({headless: false});

  let result =  await Promise.allSettled([
    /* login(browser), */
    register(browser)
  ]);

  await browser.close();
  return result;
};
