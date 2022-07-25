// Registration creds random automated generation

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makeMail(length) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function makePass(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"$%&()*+,-./:;<=>?[]^_{|}~';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// asign strings to variables
const newId = makeid(6);
const newMail = makeMail(8);
const newUser = `${newId}@${newMail}.com`;
let newPass = makePass(8);

// validate password criterias
function checkRegex(newPass) {
  validPass = false;
  var checkSpecial = /[*@!#%&()^~{}]+/.test(newPass),
    checkUpper = /[A-Z]+/.test(newPass),
    checkLower = /[a-z]+/.test(newPass);
  checkMin = /^(?=.*\d).{8,}$/.test(newPass);

  if (checkUpper && checkLower && checkSpecial && checkMin) {
    validPass = true;
  }

  return validPass;
}

checkRegex(newPass);
while (!validPass) {
  newPass = makePass(8);
  checkRegex(newPass);
}
///////////////////////////////////////////////////////////////////

module.exports = async function (browser) {
  const page = await browser.newPage();
  //Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);
  await page.goto('http://localhost:3000/signup');

  await page.type('#form > input:nth-child(2)', newUser, { delay: 100 });
  await page.type('#pass', newPass, { delay: 100 });
  await page.type('#form > input:nth-child(6)', newPass, { delay: 100 });
  await page.click('#root > div > div > div > div.card > div > form > button');
  await page.waitForNavigation();

  await page.click(
    ' #root > div > div > div > div.d-flex.align-items-center.container > div > button'
  );

  await page.close();

  return { Register: 'worked' };
};
