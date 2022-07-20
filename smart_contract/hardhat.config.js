require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/1efaf41ede2d45fcb4dd32c1073b4f5e',
      accounts: ['09acb34616e92f3105c4ae4fe66409506448385aed5e6f9d6c76bae0e20b92e8']
    }
  }
};
