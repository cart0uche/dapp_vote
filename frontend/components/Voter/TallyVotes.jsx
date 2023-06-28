"use client";
import { useState, useEffect } from "react";
import { FormControl, Textarea, Box, Button, Heading, Card, Text, Flex, Spacer,  } from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
// import { readContract } from 'wagmi/core'
import { readContract } from 'wagmi/actions'

function TallyVotes() {

    const [winningProposalID, setWinningProposalID] = useState(null);
    const { workflowStatus } = useVoteContext();



    useEffect(() => {
        if (workflowStatus === 6) {
            getWinningProposalID();
        }
    }, [workflowStatus]);



    async function getWinningProposalID() {
        try {
            const data = await readContract({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
                abi: Contract.abi,
                functionName: 'winningProposalID',
            });
            setWinningProposalID(data.toString()); // revoir usage
        } catch (error) {
            console.log(error.message);
        }
    }
    

  return (
    <div>
        <Heading>Winning Vote</Heading>
        <Box>
                <Card>
                    <Flex    >
                    <Button isDisabled={workflowStatus !== 6} onClick={getWinningProposalID} >Get Winning Vote</Button> 
                      
                    <Text fontSize={45} >  {winningProposalID} </Text>

                    </Flex>
                </Card>
            </Box>
   

    </div>
  )
}

export default TallyVotes