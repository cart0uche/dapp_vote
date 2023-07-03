import ChangeWorkflowStatus from "./ChangeWorkflowStatus";
import WorkflowStatus from "../WorkflowStatus";
import AddVoter from "./AddVoter";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import ListVoter from "../ListVoter";
import { useVoteContext } from "@/components/voteContext";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EventsList from "./EventsList";
import WinningProposal from "../WinningProposal";

function Admin() {
   const { workflowStatus } = useVoteContext();
   const { isConnected } = useAccount();

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />
            <ChangeWorkflowStatus />
            {workflowStatus === 5 ? (
               <Box
                  marginLeft="50px"
                  width="30%"
                  marginTop="50px"
                  marginBottom="50px"
               >
                  <WinningProposal />
               </Box>
            ) : null}
            <Tabs variant="soft-rounded" align="center">
               <TabList>
                  <Tab>Voters</Tab>
                  <Tab>Events</Tab>
               </TabList>

               <TabPanels>
                  <TabPanel>
                     <Flex
                        justifyContent="center"
                        alignItems="center"
                        marginTop={70}
                        marginLeft={100}
                        marginBottom={70}
                     >
                        {workflowStatus === 0 ? (
                           <Box w="300px">
                              <AddVoter />
                           </Box>
                        ) : null}
                     </Flex>
                  </TabPanel>

                  <TabPanel>
                     <EventsList />
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </div>
      );
   } else {
      return <Text> Please connect your wallet</Text>;
   }
}

export default Admin;
