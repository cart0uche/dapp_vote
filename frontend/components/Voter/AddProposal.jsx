"use client";
import { FormControl, Textarea, Box, Button, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useContractWrite } from "wagmi";
import Contract from "../../public/Voting.json";
import { useVoteContext } from "@/components/voteContext";

function AddProposal() {
   const { workflowStatus, setWorkFlowStatus } = useVoteContext();
   const [inputValue, setInputValue] = useState("");
   const [proposal, setProposal] = useState("");

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addProposal",
      args: [proposal],
   });

   const handleChange = (event) => {
      setInputValue(event.target.value);
   };

   useEffect(() => {
      if (proposal !== "") {
         write();
      }
   }, [proposal]);

   const handleSubmit = (event) => {
      event.preventDefault();
      setProposal(inputValue);
      setInputValue("");
   };

   return (
      <div>
         <Heading>Add a proposal</Heading>
         <Box marginTop="100px" margin="0 auto">
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <Textarea
                     type="text"
                     value={inputValue}
                     onChange={handleChange}
                     placeholder="proposal"
                  />
               </FormControl>
               <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="blue"
                  marginTop="4"
                  isDisabled={workflowStatus !== 1}
               >
                  Add
               </Button>
            </form>
         </Box>
      </div>
   );
}

export default AddProposal;
