let Store = require('../../credentials/storeCreds');
let Storelaunchers = require('../../launchers/storeLaunchers');
module.exports = async function (browser) {
  //we get and assigns the username and password form the storage file so we can use it here
  var registerTest = Storelaunchers.getRegister();
  var finalUser = Store.getUser();
  var finalPass = Store.getPass();
  // In this ternary change the "else" username & password as needed , those creds will be used in case w didnt register a new user
  user = finalUser ? finalUser : 'user@nomail.com';
  password = finalPass ? finalPass : 'password';
  const page = await browser.newPage();
  //for fake gelocation before oppening the webpage
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('http://localhost:3000/login', [
    'geolocation',
  ]);
  // setting fake geo location coordinates
  await page.setGeolocation({ latitude: 90, longitude: 0 });
  await page.goto('http://localhost:3000/login');

  await page.waitForTimeout(20000);
  await page.type('#form > input:nth-child(2)', user, { delay: 100 });
  await page.type('#form > input:nth-child(4)', password, { delay: 100 });

  await page.click(
    '#root > div > div > div > div > div.card > div > form > button'
  );
  await page.waitForTimeout(10000);

  //we validate if a new user is giong to be registered and which final button must be pressed
  await page.click(
    registerTest || (user != 'user' && password != 'password')
      ? '#root > div > div > div > div.d-flex.align-items-center.container > div > button'
      : '#root > div > div > div > div > button'
  );

  // this logs the new regiter creds or the DW default creds
  console.log('//////// Login ////////');
  console.log('user: ', user);
  console.log('passwords: ', password);

  await page.waitForTimeout(3000);
  //we evaluate the coordinates and show them in the browser condolr and log them in the terminal
  await page.evaluate(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      console.log(coords)
    );
  });
  const coords = await page.evaluate(
    () =>
      new Promise((resolve) =>
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) =>
            resolve({ latitude, longitude })
        )
      )
  );
  console.log(coords);
  await page.close();
  return { Login: 'worked' };
};
