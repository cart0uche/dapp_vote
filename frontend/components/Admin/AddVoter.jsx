"use client";
import { useState, useEffect } from "react";
import { FormControl, Heading, Input, Box, Button } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useVoteContext } from "@/components/voteContext";

function AddVoter() {
   const [inputValue, setInputValue] = useState("");
   const [addressVoter, setAddressVoter] = useState("");
   const { workflowStatus, setWorkFlowStatus } = useVoteContext();

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addVoter",
      args: [addressVoter],
   });

   useEffect(() => {
      if (addressVoter !== "") {
         write();
      }
   }, [addressVoter]);

   const handleChange = (event) => {
      event.preventDefault();
      console.log("handleChange");
      setInputValue(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log("handleSubmit");
      setAddressVoter(inputValue);
      setInputValue("");
   };

   return (
      <div>
         <Heading>Add a voter</Heading>
         <Box marginTop="100px" maxWidth="400px" margin="0 auto">
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <Input
                     type="text"
                     value={inputValue}
                     onChange={handleChange}
                     placeholder="address"
                  />
               </FormControl>
               <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="blue"
                  marginTop="4"
                  isDisabled={workflowStatus !== 0}
               >
                  Add
               </Button>
            </form>
         </Box>
      </div>
   );
}

export default AddVoter;
