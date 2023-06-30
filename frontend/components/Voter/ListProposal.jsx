import {
   Card,
   Heading,
   CardFooter,
   useToast,
   Divider,
   SimpleGrid,
} from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "../client";
import { useContractEvent } from "wagmi";
import Contract from "../../public/Voting.json";
import OneProposal from "./OneProposal";
import SetVote from "./SetVote";
import { v4 as uuidv4 } from "uuid";

function ListProposal({ newVote }) {
   const [proposals, setProposals] = useState([]);
   const toast = useToast();

   async function fetchProposal() {
      const filter = await publicClient.createEventFilter({
         address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
         event: parseAbiItem("event ProposalRegistered(uint256)"),
         fromBlock: 3786668n,
      });

      const logs = await publicClient.getFilterLogs({ filter });

      const parsedProposals = logs.map((log, index) => {
         const proposalId = Number(log.args[0]);
         return {
            proposalId,
         };
      });

      setProposals(parsedProposals);
   }

   useEffect(() => {
      fetchProposal();
   }, [newVote]);

   const unwatchProposal = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "ProposalRegistered",
      listener: (event) => {
         console.log("ProposalRegistered" + event);
         fetchProposal();
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "New proposal registered",
            description: "Proposal number " + event[0].args.proposalId,
         });
         unwatchProposal();
      },
   });

   return (
      <div>
         <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
         >
            {proposals.length > 0 ? (
               proposals.map((proposal) => (
                  <Card key={uuidv4()} marginBottom="4">
                     <OneProposal proposalId={proposal.proposalId} />
                     <Divider />
                     <CardFooter>
                        <SetVote proposalId={proposal.proposalId} />
                     </CardFooter>
                  </Card>
               ))
            ) : (
               <span>No proposals yet</span>
            )}
         </SimpleGrid>
      </div>
   );
}

export default ListProposal;
