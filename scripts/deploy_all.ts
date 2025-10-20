// scripts/deploy_all.js (public-safe version)
const fs = require("fs");
const path = require("path");
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Deploying with account: ${deployer.address}`);

  const addresses = { deployedAt: timestamp, deployer: deployer.address };

  // Deploy core contracts (upgradeable)
  const CAELUM = await ethers.getContractFactory("CAELUMToken");
  const caelum = await upgrades.deployProxy(CAELUM, [deployer.address], {
    initializer: "initialize",
  });
  await caelum.waitForDeployment();
  addresses.CAELUMToken = await caelum.getAddress();
  console.log("CAELUMToken:", addresses.CAELUMToken);

  const SBT = await ethers.getContractFactory("CaelumSBT");
  const sbt = await upgrades.deployProxy(SBT, ["Caelum Memory Shard", "CSBT"], {
    initializer: "initialize",
  });
  await sbt.waitForDeployment();
  addresses.CaelumSBT = await sbt.getAddress();
  console.log("CaelumSBT:", addresses.CaelumSBT);

  const Minter = await ethers.getContractFactory("ShardMinter");
  const minter = await upgrades.deployProxy(Minter, [addresses.CaelumSBT], {
    initializer: "initialize",
  });
  await minter.waitForDeployment();
  addresses.ShardMinter = await minter.getAddress();
  console.log("ShardMinter:", addresses.ShardMinter);

  // Grant minter role on SBT
  const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
  const sbtContract = await ethers.getContractAt("CaelumSBT", addresses.CaelumSBT);
  await (await sbtContract.grantRole(MINTER_ROLE, addresses.ShardMinter)).wait();

  fs.mkdirSync(path.join(__dirname, "../deployments"), { recursive: true });
  fs.writeFileSync(
    path.join(__dirname, "../deployments/addresses.json"),
    JSON.stringify(addresses, null, 2)
  );

  console.log("✅ Deployment complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
