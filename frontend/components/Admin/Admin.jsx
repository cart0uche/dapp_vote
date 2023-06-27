import ChangeWorkflowStatus from "./ChangeWorkflowStatus";
import WorkflowStatus from "../WorkflowStatus";
import AddVoter from "./AddVoter";
import { Box, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import ListVoter from "./ListVoter";

function Admin() {
   const { isConnected } = useAccount();

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />
            <ChangeWorkflowStatus />
            <Flex justifyContent="center" marginTop="50px">
               <Box>
                  <AddVoter />
               </Box>
               <Box marginLeft="50px">
                  <ListVoter />
               </Box>
            </Flex>
         </div>
      );
   } else {
   }
}

export default Admin;
