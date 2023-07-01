import { SimpleGrid, useToast } from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "./client";
import OneVoter from "./Admin/OneVoter";
import { useVoteContext } from "@/components/voteContext";
import { v4 as uuidv4 } from "uuid";

function ListVoter({ showVoterDetails }) {
   const [voters, setVoters] = useState([]);
   const { newVoter, newVote } = useVoteContext();
   const toast = useToast();

   async function fetchVoters() {
      const filter = await publicClient.createEventFilter({
         address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
         event: parseAbiItem("event VoterRegistered(address)"),
         fromBlock: 3786668n,
      });

      const logs = await publicClient.getFilterLogs({ filter });

      const parsedVoters = logs.map((log, index) => {
         const address = log.args[0];
         return {
            address,
         };
      });
      setVoters(parsedVoters);
   }

   useEffect(() => {
      fetchVoters();
   }, [newVoter, newVote]);

   return (
      <div>
         <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
         >
            {voters.length > 0 ? (
               voters.map((voter) => (
                  <OneVoter
                     key={uuidv4()}
                     address={voter.address}
                     showVoterDetails={showVoterDetails}
                  />
               ))
            ) : (
               <span>No voters yet</span>
            )}
         </SimpleGrid>
      </div>
   );
}

export default ListVoter;
