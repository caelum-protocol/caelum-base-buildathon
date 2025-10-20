require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

const { PRIVATE_KEY, API_URL, ETHERSCAN_API_KEY } = process.env;

/**
 * Base-compatible Hardhat configuration (public-safe)
 * - Uses Base Sepolia by default
 * - Loads secrets from .env (never committed)
 * - Compiles with optimizer on
 */

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    baseSepolia: {
      url: API_URL || "https://base-sepolia-rpc.publicnode.com",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || "",
  },
};
