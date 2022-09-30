const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

// instance of web3 connection
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = "Initial message";
beforeEach(async () => {
  // get list of accounts
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("matches the initial message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    // set new message
    const newMessage = "New message";
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });

    // get and check message
    const message = await inbox.methods.message().call();
    assert.equal(message, newMessage);
  });
});
