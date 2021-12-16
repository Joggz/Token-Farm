require("dotenv");
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const PRIVATE_KEY = process.env.private_key;
const MNEMONICS = process.env.mnemonic;
const { mnemonic, private_key, infura_api_key } = require("./secret");
console.log(MNEMONICS);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ropsten: {
      networkCheckTimeout: 10000,
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${infura_api_key}`
        );
      },
      network_id: 3,
      gas: 4000000, //make sure this gas allocation isn't over 4M, which is the max
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
