"use client";
import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { getAddress } from "viem";

function AddVoter() {
   const [inputValue, setInputValue] = useState("");
   const [addressVoter, setAddressVoter] = useState("");

   const { write } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addVoter",
      args: [addressVoter !== "" ? getAddress(addressVoter) : ""],
   });

   useEffect(() => {
      write();
   }, [addressVoter]);

   const handleChange = (event) => {
      setInputValue(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      setAddressVoter(inputValue);
   };

   return (
      <div>
         <Box maxWidth="400px" margin="0 auto">
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <FormLabel>Voter address</FormLabel>
                  <Input
                     type="text"
                     value={inputValue}
                     onChange={handleChange}
                     placeholder="address"
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

export default AddVoter;
