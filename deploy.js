const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const mnemonic =
  "bundle jazz skate journey cool girl unaware wrap cushion absurd glare timber";
const infuraUrl =
  "https://goerli.infura.io/v3/ef829f345ace4a66bc90155a3d57650a";

const provider = new HDWalletProvider(mnemonic, infuraUrl);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Initial"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract - ", result.options.address);
  provider.engine.stop();
};

deploy();
