const crypto = require("crypto");

class User {
  constructor(ip, userAgent) {
    this.id = crypto
      .createHash("sha256")
      .update(ip + userAgent)
      .digest("hex");
  }
}

class UserDelayList {
  constructor(user) {
    this.delay = 60000;
    this.list = [];
  }

  add(user) {
    this.list.push(user);
    setTimeout(() => {
      this.list = this.list.filter((u) => u.id !== user.id);
    }, this.delay);
  }

  has(user) {
    return this.list.some((u) => u.id === user.id);
  }
}

module.exports = { User, UserDelayList };
