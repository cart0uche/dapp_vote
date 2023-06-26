import WorkflowStatus from "../WorkflowStatus";
import AddProposal from "./AddProposal";
import { Box } from "@chakra-ui/react";
import ListProposal from "./ListProposal";
import SetVote from "./SetVote";

function Voters() {
   return (
      <div>
         <WorkflowStatus />
         <Box marginLeft="80px" marginTop="80px" justifyContent="flex-start">
            <AddProposal />
            <ListProposal />
            <SetVote />
         </Box>
      </div>
   );
}

export default Voters;
