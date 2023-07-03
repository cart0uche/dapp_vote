import { Heading, Text } from "@chakra-ui/react";
import Contract from "../public/Voting.json";
import { useContractRead, useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { fetchVoters } from "./fetchData.jsx";

function WinningProposal() {
   const [voters, setVoters] = useState([]);
   const { address } = useAccount();

   const { data: winningProposalID } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "winningProposalID",
      account: address,
      onError(error) {
         console.log("Error", error);
      },
   });

   const {
      data: dataProposal,
      isSuccess,
      isError,
   } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "getOneProposal",
      onError(error) {
         console.log("Error", error);
      },
      args: [winningProposalID],
      account: address,
   });

   useEffect(() => {
      fetchVoters(setVoters);
   }, [winningProposalID]);

   return (
      <div>
         <Heading>
            {voters !== undefined && dataProposal !== undefined && (
               <>
                  {isError ? (
                     <Text>
                        {" "}
                        Proposal number {winningProposalID.toString()} win{" "}
                     </Text>
                  ) : (
                     <Text>
                        {" "}
                        Proposal number {winningProposalID.toString()} win with{" "}
                        {(
                           (100 * Number(dataProposal.voteCount)) /
                           voters.length
                        ).toFixed(1)}
                        %
                     </Text>
                  )}
               </>
            )}
         </Heading>
      </div>
   );
}

export default WinningProposal;
