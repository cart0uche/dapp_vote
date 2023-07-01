import { Card, CardFooter, Divider, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OneProposal from "./OneProposal";
import SetVote from "./SetVote";
import { useVoteContext } from "@/components/voteContext";
import { v4 as uuidv4 } from "uuid";
import { fetchProposal } from "../fetchData.jsx";

function ListProposal() {
   const [proposals, setProposals] = useState([]);
   const { newProposal, newVote } = useVoteContext();

   useEffect(() => {
      fetchProposal(setProposals);
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
