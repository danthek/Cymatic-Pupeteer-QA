module.exports = {
  login: null,
  register: null,

  //set variables
  setLogin(loginTest) {
    this.login = loginTest;
  },
  setRegister(registerTest) {
    this.register = registerTest;
  },

  // Read Variables
  getlogin() {
    return this.login;
  },
  getRegister() {
    return this.register;
  },
};
