const puppeteer = require('puppeteer');

module.exports = async function(browser){
  const page = await browser.newPage();
  await page.goto('https://finserv.dev.cymatic.info/');
  await page.click('.nav-link.btn.btn-sm.btn-rounded');

  await page.waitForTimeout(5000);

  await page.type('[cy-user]'      , 'test.pup@gmail.com', {delay: 100});
  await page.type('[type=password]', 'ElGlande', {delay: 100});
  await page.click('[cy-submit]');

  await page.waitForNavigation();
  await page.waitForTimeout(3000);
  await page.click('[js-logout]');
  await page.waitForNavigation();
  await page.close();



  return { Login : 'worked' }
};
