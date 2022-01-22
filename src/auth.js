class Auth {
  constructor() {
    this.authenticated = false;
    this.isAdmin = false;
    this.isexpired = false;
    this.isreset = false;
  }

  login(cb) {
    this.authenticated = true;
    window.localStorage.setItem("auth", this.authenticated);
    cb();
  }

  reset(cb) {
    this.isreset = true;
    window.localStorage.setItem("reset", this.isreset);
    cb();
  }
  expired(cb) {
    this.isexpired = true;
    cb();
  }

  admin(cb) {
    this.authenticated = true;

    this.isAdmin = true;
    window.localStorage.setItem("admin", this.isAdmin);
    cb();
  }
  logout(cb) {
    this.authenticated = false;
    window.localStorage.setItem("auth", this.authenticated);
    cb();
  }

  isAuthenticated() {
    return (
      window.localStorage.getItem("auth") ||
      window.localStorage.getItem("admin")
    );
  }

  isExpired() {
    return this.isexpired;
  }

  isReset() {
    return this.isreset;
  }
}

export default new Auth();
