// Import storage file for variable sharing & Random creds component
let Store = require('../../credentials/storeCreds');
let randomCreds = require('../../credentials/randomCreds');

//main component
module.exports = async function (browser) {
  randomCreds();
  var userNew = Store.getUser();
  var passNew = Store.getPass();

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/signup');
  await page.reload();
  await page.waitForTimeout(3000);
  await page.reload();
  await page.waitForTimeout(3000);
  await page.reload();
  await page.type('#form > input:nth-child(2)', userNew, { delay: 100 });
  await page.type('#pass', passNew, { delay: 100 });
  await page.type('#form > input:nth-child(6)', passNew, { delay: 100 });
  await page.click('#root > div > div > div > div.card > div > form > button');
  await page.waitForNavigation();
  await page.click(
    ' #root > div > div > div > div.d-flex.align-items-center.container > div > button'
  );

  console.log('//////// Registration ////////');
  console.log('user: ', userNew);
  console.log('password: ', passNew);

  await page.close();
  return { Register: 'worked' };
};
