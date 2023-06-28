"use client";
import { Button, Box, useToast } from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";
import { useContractWrite } from "wagmi";
import Contract from "../../public/Voting.json";

function ChangeWorkflowStatus() {
   const { workflowStatus } = useVoteContext();
   const toast = useToast();

   function getNextStatusLabel() {
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

   const {
      write: writeStartProposalsRegistering,
      isLoading: isLoadingStartProposalsRegistering,
   } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "startProposalsRegistering",
      onError(error) {
         console.log(error);
         toast({
            status: "error",
            isClosable: true,
            position: "top-middle",
            title: "startProposalsRegistering function failed",
         });
      },
   });

   const {
      write: writeEndProposalsRegistering,
      isLoading: isLoadingEndProposalsRegistering,
   } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "endProposalsRegistering",
      onError(error) {
         console.log(error);
         toast({
            status: "error",
            isClosable: true,
            position: "top-middle",
            title: "endProposalsRegistering function failed",
         });
      },
   });

   const {
      write: writeStartVotingSession,
      isLoading: isLoadingStartVotingSession,
   } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "startVotingSession",
      onError(error) {
         console.log(error);
         toast({
            status: "error",
            isClosable: true,
            position: "top-middle",
            title: "startVotingSession function failed",
         });
      },
   });

   const {
      write: writeEndVotingSession,
      isLoading: isLoadingEndVotingSession,
   } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "endVotingSession",
      onError(error) {
         console.log(error);
         toast({
            status: "error",
            isClosable: true,
            position: "top-middle",
            title: "endVotingSession function failed",
         });
      },
   });

   const { write: writeTallyVotes, isLoading: isLoadingTallyVotes } =
      useContractWrite({
         address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
         abi: Contract.abi,
         functionName: "tallyVotes",
         onError(error) {
            console.log(error);
            toast({
               status: "error",
               isClosable: true,
               position: "top-middle",
               title: "tallyVotes function failed",
            });
         },
      });

   const sendWorkflowStatus = () => {
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
      }
   };

   const isButtonLoading = () => {
      return (
         isLoadingStartProposalsRegistering ||
         isLoadingEndProposalsRegistering ||
         isLoadingStartVotingSession ||
         isLoadingEndVotingSession ||
         isLoadingTallyVotes
      );
   };

   return (
      <div>
         <Box marginLeft="60px" marginRight="60px" marginTop="60px">
            <Button
               isLoading={isButtonLoading()}
               loadingText="Submitting"
               colorScheme="blue"
               onClick={() => sendWorkflowStatus()}
            >
               {getNextStatusLabel()}
            </Button>
         </Box>
      </div>
   );
}

export default ChangeWorkflowStatus;
