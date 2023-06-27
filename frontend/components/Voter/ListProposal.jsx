import {
   Card,
   Heading,
   CardHeader,
   CardBody,
   CardFooter,
   useToast,
   Button,
   ButtonGroup,
} from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "../client";
import { useContractEvent } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import OneProposal from "./OneProposal";
import SetVote from "./SetVote";

function ListProposal() {
   const [proposals, setProposals] = useState([]);
   const toast = useToast();

   async function fetchProposal() {
      const filter = await publicClient.createEventFilter({
         address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
         event: parseAbiItem("event ProposalRegistered(uint256)"),
         fromBlock: 0n,
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
   }, []);

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
         <Heading>List of proposals</Heading>
         {proposals.map((proposal, index) => (
            <Card key={index} marginBottom="4">
               <OneProposal proposalId={proposal.proposalId} />
               <CardFooter>
                  <SetVote proposalId={proposal.proposalId} />
               </CardFooter>
            </Card>
         ))}
      </div>
   );
}

export default ListProposal;
