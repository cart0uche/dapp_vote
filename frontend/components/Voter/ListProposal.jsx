import { Card, CardFooter, Divider, SimpleGrid } from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "../client";
import OneProposal from "./OneProposal";
import SetVote from "./SetVote";
import { useVoteContext } from "@/components/voteContext";
import { v4 as uuidv4 } from "uuid";

function ListProposal() {
   const [proposals, setProposals] = useState([]);
   const { newProposal, newVote } = useVoteContext();

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
   }, [newVote, newProposal]);

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
