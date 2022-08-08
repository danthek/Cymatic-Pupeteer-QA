module.exports = {
  user: null,
  password: null,

  //set variables
  setUser(newUser) {
    this.user = newUser;
  },
  setPass(newPass) {
    this.password = newPass;
  },

  // Read Variables
  getUser() {
    return this.user;
  },
  getPass() {
    return this.password;
  },

  flushUser() {
    delete this.user;
  },
  flushPass() {
    delete this.password;
  },
};
