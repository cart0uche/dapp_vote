"use client";
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useContractWrite, useAccount } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { Grid } from "@chakra-ui/react";


import React from 'react'

function SetVote() {
    const [inputValue, setInputValue] = useState(0);
    const [proposalId, setProposalId] = useState(0);
    
 
    const { write } = useContractWrite({
       address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
       abi: Contract.abi,
       functionName: "setVote",
       args: [proposalId],
    });
 
    const handleChange = (event) => {
       setInputValue(event.target.value);
       
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setProposalId(inputValue);
     };

     useEffect(() => {
        write();
    }, [proposalId]);
 
    return (
       <div>
        <Grid templateColumns="auto 1fr auto" gap={4} alignItems="center">
          {" "}
          <Box maxWidth="500px" margin="0 auto">
             <form onSubmit={handleSubmit}>
                <FormControl>
                   <FormLabel>Enter The proposal number you are voting for</FormLabel>
                   <Input
                      type="number"
                      value={inputValue}
                      onChange={handleChange}
                      placeholder="Number"
                      style={{ width: "fit-content" }}
                   />
                </FormControl>
                <Button type="submit" colorScheme="green" marginTop="9" rounded="full" size="lg" fontWeight="bold">
                   Vote
                </Button>
             </form>
          </Box>
          </Grid>
       </div>
    );
 }

export default SetVote
