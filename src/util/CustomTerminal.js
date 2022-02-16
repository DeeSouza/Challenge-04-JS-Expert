import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import chalk from "chalk";
import readline from "readline";
import asciichart from "asciichart";
import terminalConfig from "../config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

const kPrint = Symbol("kPrint");
const kTerminal = Symbol("kTerminal");
const kData = Symbol("kData");

class CustomTerminal {
  constructor() {
    this[kPrint] = {};
    this[kTerminal] = null;
    this[kData] = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);

    this[kTerminal] = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  draftTable() {
    // TODO: Parece que a linha a seguir precisa de um array gerado a partir dos valores da estrutura escolhida...🤔
    const data = this[kData];
    const table = chalkTable(TABLE_OPTIONS, data);
    this[kPrint] = console.draft(table);
  }

  hasDataToPrint() {
    if (this[kData].length > 0) return true;

    return false;
  }
  /**
   * Dado um array de objetos, adiciona cada registro aos dados a serem impressos.
   * @param {Array<Crypto>} data
   */
  addDataToPrint(data) {
    if (data) {
      const moreData = [...this[kData], ...data];
      this[kData] = moreData;
    }
  }

  getDataById(id) {
    const crypto = this[kData].find((item) => item.id === id);

    return crypto;
  }

  removeDataById(id) {
    const filterCryptos = this[kData].filter((item) => item.id !== id);
    this[kData] = filterCryptos;

    return filterCryptos;
  }

  plotQuoteChart(data) {
    if (!data) return;

    const s0 = [
      ...Array.from({ length: 30 }, () => data.percent_change_90d),
      ...Array.from({ length: 30 }, () => data.percent_change_60d),
      ...Array.from({ length: 30 }, () => data.percent_change_30d),
      ...Array.from({ length: 7 }, () => data.percent_change_7d),
      data.percent_change_24h,
    ];

    this.print(asciichart.plot(s0));
  }

  print(message) {
    this[kPrint] = console.log(message);
  }

  printSuccess(message) {
    this.print(chalk.green(message));
  }

  printInfo(message) {
    this.print(chalk.cyan(message));
  }

  printError(message) {
    this.print(chalk.red(message));
  }

  async readLine(label = "") {
    return new Promise((resolve) => this[kTerminal].question(label, resolve));
  }

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  close() {
    this[kTerminal].close();
  }
}

export default CustomTerminal;
