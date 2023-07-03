import ChangeWorkflowStatus from "./ChangeWorkflowStatus";
import WorkflowStatus from "../WorkflowStatus";
import AddVoter from "./AddVoter";
import { Box, Flex, Text } from "@chakra-ui/react";
import ListVoter from "../ListVoter";
import { useVoteContext } from "@/components/voteContext";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EventsList from "./EventsList";
import WinningProposal from "../WinningProposal";

function Admin() {
   const { workflowStatus } = useVoteContext();

   return (
      <div>
         <WorkflowStatus />
         <ChangeWorkflowStatus />

         <Tabs variant="soft-rounded" align="center">
            <TabList>
               {workflowStatus === 0 ? <Tab>Voters</Tab> : null}

               <Tab>Events</Tab>
            </TabList>

            <TabPanels>
               {workflowStatus === 0 ? (
                  <TabPanel>
                     <Flex
                        justifyContent="center"
                        alignItems="center"
                        marginTop={70}
                        marginLeft={100}
                        marginBottom={70}
                     >
                        <Box w="300px">
                           <AddVoter />
                        </Box>
                     </Flex>
                  </TabPanel>
               ) : null}

               <TabPanel>
                  {workflowStatus === 5 ? (
                     <Flex
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={70}
                     >
                        <Box marginLeft="50px" width="30%" marginTop="50px">
                           <WinningProposal />
                        </Box>
                     </Flex>
                  ) : null}
                  <EventsList />
               </TabPanel>
            </TabPanels>
         </Tabs>
      </div>
   );
}

export default Admin;
