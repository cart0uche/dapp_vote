import { useState } from "react";
import WorkflowStatus from "../WorkflowStatus";
import AddProposal from "./AddProposal";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import ListProposal from "./ListProposal";
import ListVoter from "../ListVoter";
import { useAccount } from "wagmi";
import WinningProposal from "./WinningProposal";
import { useVoteContext } from "@/components/voteContext";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Voters() {
   const { workflowStatus } = useVoteContext();
   const { isConnected } = useAccount();

   if (isConnected) {
      return (
         <div>
            <WorkflowStatus />

            <Tabs variant="soft-rounded" align="center" marginTop="10">
               <TabList>
                  <Tab>Proposals</Tab>
                  <Tab>Voters</Tab>
               </TabList>

               <TabPanels>
                  <TabPanel>
                     <Flex
                        justifyContent="center"
                        alignItems="center"
                        marginLeft={100}
                        marginBottom={70}
                     >
                        {workflowStatus === 1 ? (
                           <Box w="300px" marginTop={10}>
                              <AddProposal />
                           </Box>
                        ) : null}
                     </Flex>
                     <Box marginLeft={100}>
                        <ListProposal />
                     </Box>
                  </TabPanel>
                  <TabPanel>
                     <Box marginLeft="50px" marginTop="50px">
                        <ListVoter showVoterDetails={true} />
                     </Box>
                     <Box marginLeft="50px" width="30%" marginTop="50px">
                        <WinningProposal />
                     </Box>
                  </TabPanel>
               </TabPanels>
            </Tabs>
         </div>
      );
   } else {
      return <Text> Please connect your wallet</Text>;
   }
}

export default Voters;
