module.exports = async function (browser, newUser, newPass) {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto('http://localhost:3000/login');
  /*   await page.waitForTimeout(5000); */

  await page.type(
    '#form > input:nth-child(2)',
    newUser ? newUser : 'user@nomail.com',
    { delay: 100 }
  ),
    await page.type(
      '#form > input:nth-child(4)',
      newPass ? newPass : 'password',
      { delay: 100 }
    ),
    await page.click(
      '#root > div > div > div > div > div.card > div > form > button'
    ),
    await page.waitForTimeout(6000);
  await page.waitForNavigation();

  await page.close();

  return { Login: 'worked' };
};

//For Finserv
/* module.exports = async function(browser){
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

  return { login : 'worked' }
}; */
