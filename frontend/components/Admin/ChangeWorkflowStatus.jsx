"use client";
import { useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";

function ChangeWorkflowStatus() {
   const { workflowStatus, setWorkFlowStatus } = useVoteContext();

   useEffect(() => {
      console.log("=====> ChangeWorkflowStatus  ", workflowStatus);
   }, [workflowStatus]);

   function getNextStatusLabel() {
      console.log("getNextStatusLabel ", workflowStatus);
      switch (workflowStatus) {
         case 0:
            return "Change status to ProposalsRegistrationStarted";
         case 1:
            return "Change status to ProposalsRegistrationEnded";
         case 2:
            return "Change status to VotingSessionStarted";
         case 3:
            return "Change status to VotingSessionEnded";
         case 4:
            return "Change status to TallyVote";
         case 5:
            return "End";
      }
   }

   const { config: configStartProposalsRegistering } = usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "startProposalsRegistering",
   });
   const { config: configEndProposalsRegistering } = usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "endProposalsRegistering",
   });
   const { config: configStartVotingSession } = usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "startVotingSession",
   });
   const { config: configEndVotingSession } = usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "endVotingSession",
   });
   const { config: configTallyVotes } = usePrepareContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "tallyVotes",
   });

   const { write: writeStartProposalsRegistering } = useContractWrite(
      configStartProposalsRegistering
   );

   const { write: writeEndProposalsRegistering } = useContractWrite(
      configEndProposalsRegistering
   );

   const { write: writeStartVotingSession } = useContractWrite(
      configStartVotingSession
   );

   const { write: writeEndVotingSession } = useContractWrite(
      configEndVotingSession
   );

   const { write: writeTallyVotes } = useContractWrite(configTallyVotes);

   const sendWorkflowStatus = () => {
      console.log("sendWorkflowStatus");
      switch (workflowStatus) {
         case 0:
            writeStartProposalsRegistering();
            break;
         case 1:
            writeEndProposalsRegistering();
            break;
         case 2:
            writeStartVotingSession();
            break;
         case 3:
            writeEndVotingSession();
            break;
         case 4:
            writeTallyVotes();
            break;
         case 5:
            return "End";
      }
   };

   return (
      <div>
         <Box marginLeft="60px" marginRight="60px" marginTop="60px">
            <Button colorScheme="blue" onClick={() => sendWorkflowStatus()}>
               {getNextStatusLabel()}
            </Button>
         </Box>
      </div>
   );
}

export default ChangeWorkflowStatus;
