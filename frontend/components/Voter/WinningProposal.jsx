import { useState, useEffect } from "react";
import { Box, Heading, Card, Text } from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";
import Contract from "../../public/Voting.json";
import { useContractRead } from "wagmi";

function WinningProposal() {
   const { workflowStatus } = useVoteContext();
   const [winningProposalID, setWinningProposalID] = useState(null);

   const {
      data: currentWinningProposal,
      isLoading,
      error,
      refetch,
   } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "winningProposalID",
      onError(error) {
         console.log("Error", error);
      },
   });

   useEffect(() => {
      if (workflowStatus === 5 && currentWinningProposal !== null) {
         setWinningProposalID(currentWinningProposal.toString());
      }
   }, [currentWinningProposal]);

   return (
      <div>
         <Heading>Winning Vote is</Heading>
         <Box>
            {workflowStatus === 5 && (
               <Card>
                  <Text fontSize={45}>{winningProposalID}</Text>
               </Card>
            )}
         </Box>
      </div>
   );
}

export default WinningProposal;
