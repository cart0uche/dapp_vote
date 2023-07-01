import { Button, useToast } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";
import Contract from "../../public/Voting.json";
import { useVoteContext } from "@/components/voteContext";
import { MdOutlineHowToVote } from "react-icons/md";

function SetVote({ proposalId }) {
   const { workflowStatus } = useVoteContext();
   const toast = useToast();

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "setVote",
      args: [proposalId],
      onError(error) {
         console.log(error);
         toast({
            status: "error",
            isClosable: true,
            position: "top-middle",
            title: "setVote failed",
            description: error.message,
         });
      },
   });

   return (
      <div>
         <Button
            leftIcon={<MdOutlineHowToVote size={20} />}
            type="submit"
            isLoading={isLoading}
            isDisabled={workflowStatus !== 3}
            variant="solid"
            colorScheme="blue"
            onClick={write}
         >
            Vote
         </Button>
      </div>
   );
}

export default SetVote;
