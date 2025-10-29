import { ethers } from "ethers";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const contractABI = [
  {
    inputs: [{ internalType: "uint256", name: "_candidateId", type: "uint256" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_candidateId", type: "uint256" }],
    name: "getCandidate",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const getVotingContract = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(contractAddress, contractABI, await provider.getSigner());
  }
  throw new Error("MetaMask is not installed");
};

export const voteForCandidate = async (candidateId: number) => {
  const tx = await (await getVotingContract()).vote(candidateId);
  await tx.wait();
};

export const getCandidateDetails = async (candidateId: number) => {
  const [name, votes] = await (await getVotingContract()).getCandidate(candidateId);
  return { name, votes: votes.toString() };
};
