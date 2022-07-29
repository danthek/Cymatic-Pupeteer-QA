let Store = require('./storeCreds');

//main component
module.exports = async function () {
//Randomly generated Creds.
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

  //asign random strings to variables
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
  return (
  //set validated creds on Storage
  Store.setUser(newUser),
  Store.setPass(newPass)
  )
};
