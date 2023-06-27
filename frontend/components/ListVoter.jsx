import { useToast } from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "./client";
import OneVoter from "./Admin/OneVoter";
import Contract from "../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useContractEvent } from "wagmi";
import { Heading } from "@chakra-ui/react";

function ListVoter({ showVoterDetails }) {
   const [voters, setVoters] = useState([]);
   const toast = useToast();

   async function fetchVoters() {
      console.log("fetchData VoterRegistered");
      const filter = await publicClient.createEventFilter({
         address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
         event: parseAbiItem("event VoterRegistered(address)"),
         fromBlock: 0n,
      });

      const logs = await publicClient.getFilterLogs({ filter });

      const parsedVoters = logs.map((log, index) => {
         console.log("parsedVoters: " + log);
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

   const unwatchVote = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "Voted",
      listener: (event) => {
         fetchVoters();
         console.log("Voted" + event);
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

   useEffect(() => {
      fetchVoters();
   }, []);

   return (
      <div>
         <Heading>List of voters</Heading>
         {voters.map((voter, index) => (
            <OneVoter
               key={index}
               address={voter.address}
               showVoterDetails={showVoterDetails}
            />
         ))}
      </div>
   );
}

export default ListVoter;
