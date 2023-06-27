"use client";
import { FormControl, FormLabel, Input, Box, Button, useToast  } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useContractWrite, useAccount } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useContractRead, useContractEvent } from "wagmi";


function AddProposal() {
   const [inputValue, setInputValue] = useState("");
   const [proposal, setProposal] = useState("");
   const toast = useToast();

   const { write } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addProposal",
      args: [proposal],
   });

   const handleChange = (event) => {
      setInputValue(event.target.value);
   };

   useEffect(() => {
      write();
   }, [proposal]);

   const handleSubmit = (event) => {
      event.preventDefault();
      setProposal(inputValue);
   };

//  event
const unwatch = useContractEvent({
   address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
   abi: Contract.abi,
   eventName: 'ProposalRegistered',
 //- once: true,
   listener: (event) => {
 //-fetchData();
   console.log("ProposalRegistered" + event);
  //toast
      toast({
         status: "success",
         isClosable: true,
         position: "top-middle",
         title: "The Proposal registered" ,
         description: "Proposal" +" "+ event[0].args.proposalId ,
      });
 +   unwatch();
   }
 });












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
