import ChangeWorkflowStatus from "./ChangeWorkflowStatus";
import WorkflowStatus from "../WorkflowStatus";
import AddVoter from "./AddVoter";
import { Box } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import ListVoter from "./ListVoter";

function Admin() {
   const { isConnected } = useAccount();

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />
            <ChangeWorkflowStatus />
            <Box
               marginLeft="80px"
               marginTop="50px"
               display="flex"
               justifyContent="flex-start"
            >
               <AddVoter />
               <ListVoter />
            </Box>
         </div>
      );
   } else {
   }
}

export default Admin;
