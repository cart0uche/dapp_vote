import ChangeWorkflowStatus from "./ChangeWorkflowStatus";
import WorkflowStatus from "../WorkflowStatus";
import AddVoter from "./AddVoter";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import ListVoter from "../ListVoter";
import { useVoteContext } from "@/components/voteContext";

function Admin() {
   const { workflowStatus } = useVoteContext();
   const { isConnected } = useAccount();

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />
            <ChangeWorkflowStatus />
            <Flex justifyContent="center" marginTop="50px">
               {workflowStatus === 0 ? (
                  <Box>
                     <AddVoter />
                  </Box>
               ) : null}
               <Box marginLeft="50px">
                  <ListVoter showVoterDetails={false} />
               </Box>
            </Flex>
         </div>
      );
   } else {
      return <Text> Please connect your wallet</Text>;
   }
}

export default Admin;
