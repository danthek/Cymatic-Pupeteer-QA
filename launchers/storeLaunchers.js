module.exports = {
  loginTest : null,
  registerTest : null,


  //set variables
  setLogin(loginTest) {
    this.login = loginTest;
  },
  setregister(registerTest) {
    this.register = registerTest;
  },

  // Read Variables
  getlogin() {
    return this.login;
  },
  getRegister() {
    return this.register;
  },

}