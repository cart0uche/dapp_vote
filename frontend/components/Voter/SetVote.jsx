"use client";
import {
   FormControl,
   FormLabel,
   Input,
   Box,
   Button,
   useToast,
   Card,
   CardBody,
   Text,
   Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useContractWrite, useContractEvent } from "wagmi";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { Grid } from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";

import React from "react";

function SetVote() {
   const [inputValue, setInputValue] = useState(0);
   const [proposalId, setProposalId] = useState(0);
   const { workflowStatus } = useVoteContext();
   const toast = useToast();

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
      console.log("handleSubmit SETVOTE");
      setProposalId(inputValue);
   };

   useEffect(() => {
      write();
   }, [proposalId]);

   const unwatch = useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "Voted",
      listener: (event) => {
         console.log("Voted" + event);
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "Vote registered",
            description: "Proposal" + event[0].args.proposalId,
         });
         unwatch();
      },
   });

   return (
      <div>
         <Card>
            <CardBody>
               <Grid
                  templateColumns="auto 1fr auto"
                  gap={4}
                  alignItems="center"
               >
                  {" "}
                  <Box maxWidth="500px" margin="0 auto">
                     <form onSubmit={handleSubmit}>
                        <FormControl>
                           <FormLabel>
                              Enter The proposal number you are voting for
                           </FormLabel>
                           <Input
                              type="number"
                              value={inputValue}
                              onChange={handleChange}
                              placeholder="Number"
                              style={{ width: "fit-content" }}
                           />
                        </FormControl>
                        <Button
                           isDisabled={workflowStatus !== 3}
                           type="submit"
                           colorScheme="green"
                           marginTop="9"
                           rounded="full"
                           size="lg"
                           fontWeight="bold"
                        >
                           Vote
                        </Button>
                     </form>
                  </Box>
               </Grid>

               <Heading size="md">
                  Button active only at VotingSessionStarted
               </Heading>
            </CardBody>
         </Card>
      </div>
   );
}

export default SetVote;
