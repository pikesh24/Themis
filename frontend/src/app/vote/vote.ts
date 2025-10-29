
import { getVotingContract } from "../contracts/contract";

export async function vote(candidateId: number) {
  const contract = await getVotingContract();
  if (!contract) throw new Error("Voting contract is not initialized.");

  const tx = await contract.vote(candidateId);
  await tx.wait();
  
  return { txHash: tx.hash };
}

