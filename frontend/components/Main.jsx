"use client";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import Contract from "../../backend/artifacts/contracts/Voting.sol/Voting.json";

function Main() {
   const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
   const [mounted, setMounted] = useState(false);

   console.log("contractAddress: ", contractAddress);

   const {
      data: workflowStatus,
      isLoading,
      error,
   } = useContractRead({
      address: contractAddress,
      abi: Contract.abi,
      functionName: "workflowStatus",
      onError(error) {
         console.log("Error", error);
      },
   });

   useEffect(() => {
      setMounted(true);
   }, []);
   if (!mounted) return <></>;

   return (
      <div>
         <p>Status: {workflowStatus}</p>
      </div>
   );
}

export default Main;
