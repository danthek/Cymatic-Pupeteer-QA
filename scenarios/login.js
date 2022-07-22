const puppeteer = require('puppeteer');

module.exports = async function(browser){
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
  await page.click('.nav-link.btn.btn-sm.btn-rounded');

  await page.waitForTimeout(5000);

  await page.type('[#form > input:nth-child(2)]'      , 'user@nomail.com', {delay: 100});
  await page.type('[#form > input:nth-child(4)]', 'password', {delay: 100});
  await page.click('[#root > div > div > div > div > div.card > div > form > button]');

  await page.waitForNavigation();
  await page.waitForTimeout(3000);
  await page.click('[js-logout]');
  await page.waitForNavigation();
  await page.close();



  return { Login : 'worked' }
};
