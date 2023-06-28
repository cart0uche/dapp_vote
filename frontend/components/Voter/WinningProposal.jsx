import { Heading } from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";
import Contract from "../../public/Voting.json";
import { useContractRead, useAccount } from "wagmi";

function WinningProposal() {
   const { address: addrAccount } = useAccount();
   const { workflowStatus } = useVoteContext();

   const { data: winningProposalID } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "winningProposalID",
      account: addrAccount,
      onError(error) {
         console.log("Error", error);
      },
   });

   return (
      <div>
         {workflowStatus === 5 && winningProposalID !== 0 ? (
            <Heading>
               Winning Proposal is {winningProposalID.toString()}
            </Heading>
         ) : null}
      </div>
   );
}

export default WinningProposal;
