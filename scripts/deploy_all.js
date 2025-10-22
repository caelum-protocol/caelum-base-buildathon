// scripts/deploy_all.js  (public-safe demo)
// Run with: npx hardhat run scripts/deploy_all.js --network baseSepolia

const fs = require("fs");
const path = require("path");
const { ethers, upgrades } = require("hardhat");

// path to the canonical addresses file we’ll use everywhere
const OUT_DIR = path.join(__dirname, "../deployments/sepolia");
const OUT_FILE = path.join(OUT_DIR, "addresses.json");

function loadAddressesSkeleton(deployer) {
  const timestamp = new Date().toISOString();
  return {
    deployedAt: timestamp,
    deployer,
    CAELUMToken: "",
    CaelumSBT: "",
    ShardMinter: ""
  };
}

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`[${new Date().toISOString()}] Deploying from ${deployer.address}`);

  // Read existing file (if any)
  let addresses;
  if (fs.existsSync(OUT_FILE)) {
    addresses = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    // make sure required keys exist
    addresses.deployedAt ||= new Date().toISOString();
    addresses.deployer ||= deployer.address;
    addresses.CAELUMToken ||= "";
    addresses.CaelumSBT ||= "";
    addresses.ShardMinter ||= "";
  } else {
    addresses = loadAddressesSkeleton(deployer.address);
  }

  // ---- Deploy upgradeable core contracts (comment out if already deployed) ----
  const CAELUM = await ethers.getContractFactory("CAELUMToken");
  const caelum = await upgrades.deployProxy(CAELUM, [deployer.address], { initializer: "initialize" });
  await caelum.waitForDeployment();
  addresses.CAELUMToken = await caelum.getAddress();
  console.log("CAELUMToken:", addresses.CAELUMToken);

  const SBT = await ethers.getContractFactory("CaelumSBT");
  const sbt = await upgrades.deployProxy(SBT, ["Caelum Memory Shard", "CSBT"], { initializer: "initialize" });
  await sbt.waitForDeployment();
  addresses.CaelumSBT = await sbt.getAddress();
  console.log("CaelumSBT:", addresses.CaelumSBT);

  const Minter = await ethers.getContractFactory("ShardMinter");
  const minter = await upgrades.deployProxy(Minter, [addresses.CaelumSBT], { initializer: "initialize" });
  await minter.waitForDeployment();
  addresses.ShardMinter = await minter.getAddress();
  console.log("ShardMinter:", addresses.ShardMinter);

  // ---- Grant MINTER_ROLE on SBT to ShardMinter ----
  const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
  const sbtContract = await ethers.getContractAt("CaelumSBT", addresses.CaelumSBT);
  await (await sbtContract.grantRole(MINTER_ROLE, addresses.ShardMinter)).wait();

  // ---- Persist the file ----
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(addresses, null, 2));
  console.log("✅ Deployment complete and addresses written to:", OUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
