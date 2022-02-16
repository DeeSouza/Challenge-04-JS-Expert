import User from "./User.js";

const kUsers = Symbol("kUsers");

class Users {
  constructor() {
    this[kUsers] = [];
  }

  add(userRaw) {
    const user = new User(userRaw);

    this[kUsers] = [...this[kUsers], user];
  }

  hasUsers() {
    return this[kUsers].length > 0;
  }

  *[Symbol.iterator]() {
    const idUsers = [...this[kUsers]].map((item) => `id=${item.id}`);

    yield idUsers;
  }
}

export default Users;
