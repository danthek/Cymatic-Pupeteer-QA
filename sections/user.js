const puppeteer = require('puppeteer');

let login = require('../scenarios/login');

module.exports.start = async function(){
  const browser = await puppeteer.launch({headless: true});

  let result =  await Promise.allSettled([
    login(browser)
  ]);

  await browser.close();
  return result;
};
