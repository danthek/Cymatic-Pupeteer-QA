let Store = require('../../credentials/storeCreds');
let Storelaunchers = require('../../launchers/storeLaunchers');
module.exports = async function (browser) {
  var registerTest = Storelaunchers.getRegister();
  var finalUser = Store.getUser();
  var finalPass = Store.getPass();
  user = finalUser ? finalUser : 'user@nomail.com';
  password = finalPass ? finalPass : 'password';
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');
  await page.waitForTimeout(20000);
  await page.type('#form > input:nth-child(2)', user, { delay: 100 }),
  await page.type('#form > input:nth-child(4)', password, { delay: 100 })
  await page.click(
    '#root > div > div > div > div > div.card > div > form > button'
    )
    await page.waitForTimeout(5000);
    //we validate if a new user is giong to be registered and which final button must be pressed
    // in order for this to work, Cymatic app must make ATO on DW Creds of the default username & passworrd
    await page.click(registerTest ? '#root > div > div > div > div.d-flex.align-items-center.container > div > button' : '#root > div > div > div > div > button' )
   
  console.log('//////// Login ////////');
  console.log('user: ', user);
  console.log('password: ', password);

  await page.waitForTimeout(3000);
  await page.close();
  return { Login: 'worked' };
};
