"use client";
import { useState, useEffect } from "react";
import {
   FormControl,
   FormLabel,
   Input,
   Box,
   Button,
   useToast,
} from "@chakra-ui/react";
import { useContractWrite, useContractEvent } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { getAddress } from "viem";

function AddVoter() {
   const [inputValue, setInputValue] = useState("");
   const [addressVoter, setAddressVoter] = useState("");
   const toast = useToast();

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addVoter",
      args: [addressVoter],
   });

   const unwatch = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "VoterRegistered",
      listener(event) {
         console.log(event);
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "New voter added",
            description: "From " + event[0].args.voterAddress,
         });
         //Zunwatch();
      },
   });

   useEffect(() => {
      if (addressVoter !== "") {
         console.log("WRITE ! ", addressVoter);
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
               <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="blue"
                  marginTop="4"
               >
                  Add
               </Button>
            </form>
         </Box>
      </div>
   );
}

export default AddVoter;
