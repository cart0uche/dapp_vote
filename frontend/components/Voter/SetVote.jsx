import { useContractWrite } from "wagmi";
import Contract from "../../public/Voting.json";
import { useVoteContext } from "@/components/voteContext";
import { MdOutlineHowToVote } from "react-icons/md";
import {
   ButtonGroup,
   Button,
   useToast,
   Popover,
   PopoverTrigger,
   PopoverContent,
   PopoverHeader,
   PopoverBody,
   PopoverFooter,
   PopoverArrow,
   PopoverCloseButton,
   useDisclosure,
} from "@chakra-ui/react";

function SetVote({ proposalId }) {
   const { workflowStatus } = useVoteContext();
   const { isOpen, onToggle, onClose } = useDisclosure();
   const toast = useToast();

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "setVote",
      args: [proposalId],
      onError(error) {
         console.log(error);
         onClose();
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
         <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={false}
         >
            <PopoverTrigger>
               <Button
                  leftIcon={<MdOutlineHowToVote size={20} />}
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={workflowStatus !== 3}
                  variant="solid"
                  colorScheme="blue"
                  onClick={onToggle}
               >
                  Vote
               </Button>
            </PopoverTrigger>

            <PopoverContent>
               <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
               <PopoverArrow />
               <PopoverCloseButton />
               <PopoverBody>
                  Are you sure you want to vote for this proposal ?
               </PopoverBody>
               <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                     <Button variant="outline" onClick={onClose}>
                        No
                     </Button>
                     <Button colorScheme="red" onClick={write}>
                        Yes
                     </Button>
                  </ButtonGroup>
               </PopoverFooter>
            </PopoverContent>
         </Popover>
      </div>
   );
}

export default SetVote;
