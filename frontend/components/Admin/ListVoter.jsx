import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   useToast,
} from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "../client";
import OneVoter from "./OneVoter";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useContractEvent } from "wagmi";
import { Heading } from "@chakra-ui/react";

function ListVoter() {
   const [voters, setVoters] = useState([]);
   const toast = useToast();

   async function fetchData() {
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
         fetchData();
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

   useEffect(async () => {
      fetchData();
   }, []);

   return (
      <div>
         <Heading>List of voters</Heading>
         {voters.map((voter, index) => (
            <Card key={index} marginBottom="4">
               <OneVoter address={voter.address} />
            </Card>
         ))}
      </div>
   );
}

export default ListVoter;
