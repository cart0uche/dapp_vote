import { useState, useEffect } from "react";
import {
   Flex,
   Box,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   TableContainer,
} from "@chakra-ui/react";
import { useVoteContext } from "@/components/voteContext";
import { fetchVoters, fetchProposal, fetchVotes } from "../fetchData.jsx";

function EventsList() {
   const { newVoter, newProposal, newVote } = useVoteContext();
   const [participation, setParticipation] = useState(0);
   const [voters, setVoters] = useState([]);
   const [proposals, setProposals] = useState([]);
   const [votes, setVotes] = useState([]);

   useEffect(() => {
      fetchVoters(setVoters);
   }, [newVoter]);

   useEffect(() => {
      fetchVotes(setVotes);
      if (proposals.length !== 0) {
         setParticipation((100 * votes.length) / proposals.length);
      }
   }, [newVote]);

   useEffect(() => {
      fetchProposal(setProposals);
   }, [newProposal]);

   return (
      <div>
         <Flex justifyContent="center">
            <Box m={4} borderWidth="1px" color="#3182CE" borderColor="#3182CE">
               <TableContainer>
                  <Table variant="simple" size="lg">
                     <Thead>
                        <Tr>
                           <Th textAlign="center">Voters</Th>
                        </Tr>
                     </Thead>

                     <Tbody>
                        {voters.map((voter) => (
                           <Tr>
                              <Td>{voter.address}</Td>
                           </Tr>
                        ))}
                     </Tbody>
                  </Table>
               </TableContainer>
            </Box>

            <Box m={4} borderWidth="1px" color="#3182CE" borderColor="#3182CE">
               <TableContainer>
                  <Table variant="simple" size="lg">
                     <Thead>
                        <Tr>
                           <Th textAlign="center">Proposals</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {proposals.map((voter) => (
                           <Tr>
                              <Td textAlign="center">{voter.proposalId}</Td>
                           </Tr>
                        ))}
                     </Tbody>
                  </Table>
               </TableContainer>
            </Box>

            <Box m={4} borderWidth="1px" color="#3182CE" borderColor="#3182CE">
               <TableContainer>
                  <Table variant="simple" size="lg">
                     <Thead>
                        <Tr>
                           <Th textAlign="center">
                              Votes (participation {participation}%)
                           </Th>
                        </Tr>
                     </Thead>
                     {votes.map((voter) => (
                        <Tr>
                           <Td>
                              {voter.address} votes proposal {voter.proposalId}
                           </Td>
                        </Tr>
                     ))}
                  </Table>
               </TableContainer>
            </Box>
         </Flex>
      </div>
   );
}

export default EventsList;
