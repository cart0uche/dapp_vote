import WorkflowStatus from "../WorkflowStatus";
import AddProposal from "./AddProposal";
import { Box, Flex } from "@chakra-ui/react";
import ListProposal from "./ListProposal";
import ListVoter from "../ListVoter";
import { useAccount } from "wagmi";
import TallyVotes from "./TallyVotes";


function Voters() {
   const { isConnected } = useAccount();

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />
            <Flex justifyContent="center" marginTop="50px">
               <Flex width="50%" direction="column" alignItems="center">
                  <Box width="50%" marginBottom="20px">
                     <AddProposal />
                  </Box>
                  <Box width="50%">
                     <ListProposal />
                  </Box>
               </Flex>
               <Box marginLeft="50px" width="30%">
                  <ListVoter showVoterDetails={true} />
               </Box>
               <Box marginLeft="50px" width="30%">
                  <TallyVotes />
               </Box>
            </Flex>
         </div>
      );
   } else {
   }
}

export default Voters;
