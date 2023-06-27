import { Button, ButtonGroup } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useVoteContext } from "@/components/voteContext";

function SetVote({ proposalId }) {
   const { workflowStatus } = useVoteContext();

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "setVote",
      args: [proposalId],
   });

   return (
      <div>
         {" "}
         <ButtonGroup spacing="2">
            <Button
               type="submit"
               isLoading={isLoading}
               isDisabled={workflowStatus !== 3}
               variant="solid"
               colorScheme="blue"
               onClick={write}
            >
               Vote
            </Button>
         </ButtonGroup>
      </div>
   );
}

export default SetVote;
