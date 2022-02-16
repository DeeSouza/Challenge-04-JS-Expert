import Crypto from "../entity/Crypto.js";
import CryptoRepository from "../repository/CryptoRepository.js";

class CryptoService {
  #page;
  #hasData;

  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
    this.#page = 1;
    this.#hasData = true;
  }

  async *list() {
    while (this.#hasData) {
      const { data } = await this.repository.list(this.#page);

      if (!data) this.#hasData = false;

      const cryptosFormatted = data.map(
        ({ id, symbol, name, cmc_rank, total_supply, quote }) => {
          const dataFormatted = new Crypto({
            id,
            symbol,
            name,
            cmc_rank,
            total_supply,
            quote,
          });

          return dataFormatted;
        }
      );

      yield cryptosFormatted;

      this.#page++;
    }
  }
}

export default CryptoService;
