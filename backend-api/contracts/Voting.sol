// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        string name;
        uint256 votes;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint256 public candidateCount;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;

        candidates[candidateCount++] = Candidate("John Anderson", 0);
        candidates[candidateCount++] = Candidate("Sarah Williams", 0);
        candidates[candidateCount++] = Candidate("Michael Johnson", 0);
    }

    function vote(uint256 _candidateId) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate");
        candidates[_candidateId - 1].votes++;
        hasVoted[msg.sender] = true;
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory, uint256) {
        require(_candidateId < candidateCount, "Invalid candidate");
        Candidate memory c = candidates[_candidateId];
        return (c.name, c.votes);
    }
}
