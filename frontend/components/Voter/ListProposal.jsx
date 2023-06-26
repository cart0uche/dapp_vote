import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { parseAbiItem } from "viem";
import { useEffect, useState } from "react";
import { publicClient } from "../client";

import OneProposal from "./OneProposal";

function ListProposal() {
   const [proposals, setProposals] = useState([]);

   useEffect(async () => {
      async function fetchData() {
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
      fetchData();
   }, []);

   return (
      <div>
         {" "}
         {proposals.map((proposal, index) => (
            <Card key={index} marginBottom="4">
               <OneProposal proposalId={proposal.proposalId} />
            </Card>
         ))}
      </div>
   );
}

export default ListProposal;
