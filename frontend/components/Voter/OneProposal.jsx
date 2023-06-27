"use client";
import { CardHeader, CardBody } from "@chakra-ui/react";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useContractRead } from "wagmi";

function OneProposal({ proposalId }) {
   const { data: dataProposal } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "getOneProposal",
      onError(error) {
         console.log("Error", error);
      },
      args: [proposalId],
   });

   return (
      <>
         {dataProposal ? (
            <>
               <CardHeader>Proposal number {proposalId}</CardHeader>
               <CardBody>{dataProposal.description}</CardBody>
            </>
         ) : null}
      </>
   );
}

export default OneProposal;
