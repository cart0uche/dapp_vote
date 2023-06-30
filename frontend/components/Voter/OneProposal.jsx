"use client";
import { CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import Contract from "../../public/Voting.json";
import { useContractRead, useAccount } from "wagmi";
import { useVoteContext } from "@/components/voteContext";
import { VscAccount } from "react-icons/md";

function OneProposal({ proposalId }) {
   const { workflowStatus } = useVoteContext();
   const { address } = useAccount();

   const { data: dataProposal } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "getOneProposal",
      onError(error) {
         console.log("Error", error);
      },
      args: [proposalId],
      account: address,
   });

   return (
      <>
         {dataProposal ? (
            <>
               <CardHeader>Proposal number {proposalId}</CardHeader>
               <CardBody>{dataProposal.description}</CardBody>
               <CardFooter>
                  {workflowStatus >= 3 ? (
                     <>{dataProposal.voteCount.toString() + " vote"}</>
                  ) : (
                     ""
                  )}
               </CardFooter>
            </>
         ) : null}
      </>
   );
}

export default OneProposal;
