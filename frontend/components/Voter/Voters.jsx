import WorkflowStatus from "../WorkflowStatus";
import AddProposal from "./AddProposal";
import { Box, Flex, Text } from "@chakra-ui/react";
import ListProposal from "./ListProposal";
import ListVoter from "../ListVoter";
import { useAccount } from "wagmi";
import WinningProposal from "./WinningProposal";
import { useVoteContext } from "@/components/voteContext";

function Voters() {
   const { workflowStatus } = useVoteContext();
   const { isConnected } = useAccount();

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
                     <ListProposal />
                  </Box>
               </Flex>

               <Box marginLeft="50px" width="30%" marginTop="50px">
                  <ListVoter showVoterDetails={true} />
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
