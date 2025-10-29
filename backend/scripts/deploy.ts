import { ethers } from "hardhat";

async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  await voting.waitForDeployment();

  const votingAddress = await voting.getAddress();
  console.log(`✅ Voting contract deployed at: ${votingAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
