import User from "./User.js";

const kUsers = Symbol("kUsers");

class Users {
  constructor() {
    this[kUsers] = new Set();
  }

  add(userRaw) {
    const user = new User(userRaw);
    this[kUsers].add(user);
  }

  hasUsers() {
    return this[kUsers].size > 0;
  }

  *[Symbol.iterator]() {
    for (const user of this[kUsers]) {
      yield user;
    }
  }
}

export default Users;
