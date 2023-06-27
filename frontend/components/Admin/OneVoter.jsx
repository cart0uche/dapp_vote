import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useContractRead } from "wagmi";

function OneVoter({ address, showVoterDetails }) {
   const {
      data: dataVoter,
      isLoading,
      error,
      refetch,
   } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "getVoter",
      onError(error) {
         console.log("Error", error);
      },
      args: [address],
   });

   console.log(dataVoter);

   function getVoterInfo() {
      if (dataVoter.hasVoted) {
         return (
            <>
               <CheckIcon boxSize="5" color="green" />
               <span>
                  {" "}
                  Has voted for proposal id{" "}
                  {dataVoter.votedProposalId.toString()}
               </span>
            </>
         );
      } else
         return (
            <>
               <CloseIcon boxSize="5" color="red" />
               <span> No voted yet</span>
            </>
         );
   }

   return (
      <>
         {dataVoter ? (
            <Card marginBottom="4">
               <CardHeader>
                  <Heading size="md"> {address}</Heading>
               </CardHeader>
               <CardBody>{showVoterDetails ? getVoterInfo() : ""}</CardBody>
            </Card>
         ) : null}
      </>
   );
}

export default OneVoter;
