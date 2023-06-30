import { useState } from "react";
import WorkflowStatus from "../WorkflowStatus";
import AddProposal from "./AddProposal";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import ListProposal from "./ListProposal";
import ListVoter from "../ListVoter";
import { useAccount, useContractEvent } from "wagmi";
import WinningProposal from "./WinningProposal";
import { useVoteContext } from "@/components/voteContext";
import Contract from "../../public/Voting.json";

function Voters() {
   const { workflowStatus } = useVoteContext();
   const { isConnected } = useAccount();
   const [newVote, setNewVote] = useState(0);
   const toast = useToast();

   const unwatchVote = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "Voted",
      listener: (event) => {
         console.log("Voted" + event);
         setNewVote(newVote + 1);
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

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />
            <Flex justifyContent="center" marginTop="50px">
               
               <Flex width="30%" direction="column" alignItems="center">
                  {workflowStatus === 1 ? (
                     <Box width="50%" marginBottom="20px" marginTop="50px">
                        <AddProposal />
                     </Box>
                  ) : null}
                  <Box width="50%" marginTop="50px">
                     <ListProposal newVote={newVote} />
                  </Box>
               </Flex>

               <Box marginLeft="50px" width="30%" marginTop="50px">
                  <ListVoter showVoterDetails={true} newVote={newVote} />
               </Box>

               <Box marginLeft="50px" width="30%" marginTop="50px">
                  <WinningProposal />
               </Box>
            </Flex>
         </div>
      );
   } else {
      return <Text> Please connect your wallet</Text>;
   }
}

export default Voters;
