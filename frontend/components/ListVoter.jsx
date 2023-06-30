import { SimpleGrid, useToast } from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "./client";
import OneVoter from "./Admin/OneVoter";
import Contract from "../public/Voting.json";
import { useContractEvent } from "wagmi";
import { Heading } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

function ListVoter({ showVoterDetails, newVote }) {
   const [voters, setVoters] = useState([]);
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

   const unwatch = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "VoterRegistered",
      listener(event) {
         fetchVoters();
         console.log("VoterRegistered" + event);
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "New voter added",
            description: "From " + event[0].args.voterAddress,
         });
         unwatch();
      },
   });

   useEffect(() => {
      fetchVoters();
   }, [newVote]);

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
