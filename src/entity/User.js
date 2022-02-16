class User {
  constructor({ id }) {
    this.id = id;
  }

  [Symbol.toPrimitive]() {
    return `id=${this.id}`;
  }
}

export default User;
