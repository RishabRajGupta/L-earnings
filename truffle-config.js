// Import the HDWalletProvider if you plan to use it for deploying contracts
// const HDWalletProvider = require('@truffle/hdwallet-provider');

const path = require('path'); // For resolving paths
const fs = require('fs'); // For reading files

module.exports = {
  // This is the main network configuration for your project
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Ganache port (default: 8545)
      network_id: "1337",    // Network ID for Ganache
      gas: 6721975,          // Gas limit - optional, can be adjusted as needed
      gasPrice: 20000000000  // Gas price - optional, can be adjusted as needed
    },
    // Other networks can be configured here (e.g., Rinkeby, Mainnet)
  },

  // Specify where to find the compiled contracts
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  // Configure the compiler for Solidity
  compilers: {
    solc: {
      version: "0.8.0",    // Specify the Solidity version (change as needed)
      settings: {          // Optional settings
        optimizer: {
          enabled: true,
          runs: 200         // Optimize for how many times you intend to run the code
        }
      }
    }
  },

  // Optional: Use the plugins
  // plugins: ["truffle-plugin-verify"], // Uncomment if you are using any plugins

  // Optional: Set up the mocha testing framework options
  mocha: {
    timeout: 100000      // Set a timeout for your tests (in milliseconds)
  }
};