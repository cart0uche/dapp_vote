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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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
                        <ListProposal newVote={newVote} />
                     </Box>
                  </TabPanel>
                  <TabPanel>
                     <Box marginLeft="50px" marginTop="50px">
                        <ListVoter showVoterDetails={true} newVote={newVote} />
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
