const puppeteer = require('puppeteer');

module.exports = async function(browser){
  const page = await browser.newPage();
  await page.goto('https://finserv.dev.cymatic.info/');
  await page.click('.nav-link.btn.btn-sm.btn-rounded');

  await page.waitForTimeout(5000);

  await page.type('[cy-user]'      , 'guillen.narciso@gmail.com');
  await page.type('[type=password]', 'javascript(alert="hello")');
  await page.click('[cy-submit]');

  await page.close();

  return { xss : 'worked' }
};
