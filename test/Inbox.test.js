const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

// instance of web3 connection
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
beforeEach(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Initial message"],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("", () => {
  it("", () => {
    console.log(inbox);
  });
});
