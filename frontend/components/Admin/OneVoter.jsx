import { CardHeader, CardBody } from "@chakra-ui/react";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting.json";
import { useContractRead } from "wagmi";

function OneVoter({ address }) {
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

   return (
      <>
         {dataVoter ? (
            <>
               <CardHeader>Voter address: {address}</CardHeader>
               <CardBody></CardBody>
            </>
         ) : null}
      </>
   );
}

export default OneVoter;
