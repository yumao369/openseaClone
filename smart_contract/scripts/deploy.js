
const hre = require("hardhat");
const fs = require("fs");

async function main () {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace")
  const nftMarketplace = await NFTMarketplace.deploy()
  await nftMarketplace.deployed()
  console.log("nftMarketplace deployed to:", nftMarketplace.address)
  fs.writeFileSync('./config.js', `export const marketplaceAddress = "${nftMarketplace.address}"`)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runMain()
