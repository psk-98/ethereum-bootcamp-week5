require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_TEST_RPC_API_KEY,
      accounts: [process.env.TESTNET_PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./app/src/artifacts",
  },
}
