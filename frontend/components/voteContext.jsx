"use client";
import { createContext, useState, useContext } from "react";
import { useContractEvent } from "wagmi";
import Contract from "../public/Voting.json";
import { useToast } from "@chakra-ui/react";

const VoteContext = createContext({});

export const VoteContextProvider = ({ children }) => {
   const [workflowStatus, setWorkFlowStatus] = useState(0);
   const [newProposal, setNewProposal] = useState(0);
   const [newVoter, setNewVoter] = useState(0);
   const [newVote, setNewVote] = useState("");
   const toast = useToast();

   const unwatchProposal = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "ProposalRegistered",
      listener: (event) => {
         console.log("ProposalRegistered");
         setNewProposal(event[0].args.proposalId);
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "New proposal registered",
            description: "Proposal number " + event[0].args.proposalId,
         });
         unwatchProposal();
      },
   });

   const unwatchVote = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "Voted",
      listener: (event) => {
         setNewVote(event[0].args.voter);
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "Vote registered",
            description: "Proposal" + event[0].args.proposalId,
         });
         unwatchVote();
      },
   });

   const unwatchVoter = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "VoterRegistered",
      listener(event) {
         setNewVoter(event[0].args.voterAddress);
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "New voter added",
            description: "From " + event[0].args.voterAddress,
         });
         unwatchVoter();
      },
   });

   return (
      <VoteContext.Provider
         value={{
            workflowStatus,
            setWorkFlowStatus,
            newProposal,
            newVoter,
            newVote,
         }}
      >
         {children}
      </VoteContext.Provider>
   );
};

export const useVoteContext = () => useContext(VoteContext);
