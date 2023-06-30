import {
   Card,
   CardHeader,
   CardBody,
   Heading,
   Tooltip,
   Flex,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import Contract from "../../public/Voting.json";
import { useContractRead, useAccount } from "wagmi";
import Blockies from "react-blockies";

function OneVoter({ address, showVoterDetails }) {
   const { address: addrAccount } = useAccount();
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
      account: addrAccount,
   });

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
         <Card marginBottom="4">
            <CardHeader>
               <Flex gap="6">
                  <Blockies
                     seed={address}
                     size="12"
                     scale="4"
                     bgcolor="#aaa"
                     spotcolor="#000"
                  />
                  <Heading size="md">
                     <Tooltip label={address} aria-label="A tooltip">
                        {address.substring(0, 4) +
                           "..." +
                           address.substring(address.length - 4)}
                     </Tooltip>
                  </Heading>
               </Flex>
            </CardHeader>
            <CardBody>
               {showVoterDetails && dataVoter ? getVoterInfo() : ""}
            </CardBody>
         </Card>
      </>
   );
}

export default OneVoter;
