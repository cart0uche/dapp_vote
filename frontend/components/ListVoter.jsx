import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OneVoter from "./Admin/OneVoter";
import { useVoteContext } from "@/components/voteContext";
import { v4 as uuidv4 } from "uuid";
import { fetchVoters } from "./fetchData.jsx";

function ListVoter() {
   const [voters, setVoters] = useState([]);
   const { newVoter, newVote } = useVoteContext();

   useEffect(() => {
      fetchVoters(setVoters);
   }, [newVoter, newVote]);

   return (
      <div>
         <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
         >
            {voters.length > 0 ? (
               voters.map((voter) => (
                  <OneVoter key={uuidv4()} address={voter.address} />
               ))
            ) : (
               <span>No voters yet</span>
            )}
         </SimpleGrid>
      </div>
   );
}

export default ListVoter;
