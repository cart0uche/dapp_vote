"use client";
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useContractWrite, useAccount } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";

function AddProposal() {
   const [inputValue, setInputValue] = useState("");
   const [proposal, setProposal] = useState("");

   const { write } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addProposal",
      args: [proposal],
   });

   const handleChange = (event) => {
      setInputValue(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      setProposal(inputValue);
      write();
      setInputValue("");
   };

   return (
      <div>
         {" "}
         <Box maxWidth="1000px" margin="0 auto">
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <FormLabel>Add a proposal</FormLabel>
                  <Input
                     type="text"
                     value={inputValue}
                     onChange={handleChange}
                     placeholder="proposal"
                  />
               </FormControl>
               <Button type="submit" colorScheme="blue" marginTop="4">
                  Add
               </Button>
            </form>
         </Box>
      </div>
   );
}

export default AddProposal;
