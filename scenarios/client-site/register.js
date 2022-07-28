// Import storage file for variable sharing
let Store = require('../../store');

//Registration creds random automated generation
function generate(field, length) {
  var result = '';
  switch (field) {
    case 'id':
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      break;
    case 'mail':
      var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      break;
    case 'pass':
      var characters =
        'AABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&()*+,-./:;<=>?[]^_{|}~';
  }
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  length = '';
  return result;
}

//asign strings to variables
var field;
var length;
var newId = generate((field = 'id'), (length = 6));
var newMail = generate((field = 'mail'), (length = 6));
var newUser = `${newId}@${newMail}.com`;
var newPass = generate((field = 'pass'), (length = 12));

//validate password criterias
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

// Ensure the password gets created following the criterias
checkRegex(newPass);
while (!validPass) {
  newPass = generate((field = 'pass'), (length = 12));
  checkRegex(newPass);
}

//seting storage credentials
Store.setUser(newUser);
Store.setPass(newPass);

//main component
module.exports = async function (browser) {
  const page = await browser.newPage();
  //Configure the navigation timeout
   /*  await page.setDefaultNavigationTimeout(0); */
  await page.goto('http://localhost:3000/signup');
  await page.waitForTimeout(5000);

  await page.type('#form > input:nth-child(2)', newUser, { delay: 100 });
  await page.type('#pass', newPass, { delay: 100 });
  await page.type('#form > input:nth-child(6)', newPass, { delay: 100 });
  await page.click('#root > div > div > div > div.card > div > form > button');
  await page.waitForNavigation();

  await page.click(
    ' #root > div > div > div > div.d-flex.align-items-center.container > div > button'
  );
  console.log('//////// Registration ////////');
  console.log('Id: ', newId);
  console.log('mail: ', newMail);
  console.log('user: ', newUser);
  console.log('password: ', newPass);

  /*   await page.waitForNavigation(); */
 /*    await page.waitForTimeout(25000); */
  await page.close();
  return { Register: 'worked' };
};
