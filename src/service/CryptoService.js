import Crypto from "../entity/Crypto.js";
import CryptoRepository from "../repository/CryptoRepository.js";

class CryptoService {
  #page;
  #limit;
  #hasData;

  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
    this.#page = 1;
    this.#limit = 5;
    this.#hasData = true;
  }

  async *list() {
    while (this.#hasData) {
      const { data } = await this.repository.list(this.#page, this.#limit);
      if (!data) this.#hasData = false;

      const cryptosFormatted = data.map((item) => new Crypto(item));

      yield cryptosFormatted;

      this.#page++;
    }
  }
}

export default CryptoService;
