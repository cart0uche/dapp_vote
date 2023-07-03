import { publicClient } from "./client";
import { parseAbiItem } from "viem";

const fromBlock = 3786668n; //0n;

export async function fetchVoters(setter) {
   const filter = await publicClient.createEventFilter({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      event: parseAbiItem("event VoterRegistered(address)"),
      fromBlock: fromBlock,
   });

   const logs = await publicClient.getFilterLogs({ filter });

   const parsedVoters = logs.map((log, index) => {
      const address = log.args[0];
      return {
         address,
      };
   });
   setter(parsedVoters);
}

export async function fetchProposal(setter) {
   const filter = await publicClient.createEventFilter({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      event: parseAbiItem("event ProposalRegistered(uint256)"),
      fromBlock: fromBlock,
   });

   const logs = await publicClient.getFilterLogs({ filter });

   const parsedProposals = logs.map((log, index) => {
      const proposalId = Number(log.args[0]);
      return {
         proposalId,
      };
   });

   setter(parsedProposals);
}

export async function fetchVotes(setter) {
   const filter = await publicClient.createEventFilter({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      event: parseAbiItem("event Voted(address, uint256)"),
      fromBlock: fromBlock,
   });

   const logs = await publicClient.getFilterLogs({ filter });

   const parsedProposals = logs.map((log, index) => {
      const address = log.args[0];
      const proposalId = Number(log.args[1]);
      return {
         address,
         proposalId,
      };
   });

   setter(parsedProposals);
}
