let Store = require('../../credentials/storeCreds');

module.exports = async function (browser) {
  var finalUser = Store.getUser();
  var finalPass = Store.getPass();
  user = finalUser ? finalUser : 'user@nomail.com';
  password = finalPass ? finalPass : 'password';
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');
  await page.waitForTimeout(15000);
  await page.type(
    '#form > input:nth-child(2)', user,
    { delay: 100 }
  ),
    await page.type(
      '#form > input:nth-child(4)', password,
      { delay: 100 }
    ),
    await page.click(
      '#root > div > div > div > div > div.card > div > form > button'
    ),
    
  console.log('//////// Login ////////');
  console.log('user: ', user);
  console.log('password: ', password);

  await page.waitForTimeout(5000)
  await page.close();
  return { Login: 'worked' };
};
