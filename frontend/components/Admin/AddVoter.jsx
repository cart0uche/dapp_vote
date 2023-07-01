"use client";
import { useState, useEffect } from "react";
import {
   FormControl,
   Heading,
   Input,
   Box,
   Button,
   useToast,
} from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";
import Contract from "../../public/Voting.json";
import { isAddress } from "viem";

function AddVoter() {
   const [inputValue, setInputValue] = useState("");
   const [addressVoter, setAddressVoter] = useState("");
   const [displayBadAddress, setDisplayBadAddress] = useState(false);
   const toast = useToast();

   const { write, isLoading } = useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "addVoter",
      args: [addressVoter],
      onError(error) {
         console.log(error);
         toast({
            status: "error",
            isClosable: true,
            position: "top-middle",
            title: "addVoter failed",
            description: error.message,
         });
      },
   });

   useEffect(() => {
      if (addressVoter !== "") {
         write();
      }
      return () => {
         setAddressVoter("");
      };
   }, [addressVoter]);

   const handleChange = (event) => {
      event.preventDefault();
      setInputValue(event.target.value);
      if (displayBadAddress) {
         if (isAddress(event.target.value)) {
            setDisplayBadAddress(false);
         }
      }
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      if (isAddress(inputValue)) {
         setDisplayBadAddress(false);
         setAddressVoter(inputValue);
      } else {
         setDisplayBadAddress(true);
      }
      setInputValue("");
   };

   return (
      <div>
         <Heading>Add a voter</Heading>
         <Box maxWidth="400px" margin="0 auto" mt={3}>
            <form onSubmit={handleSubmit}>
               <FormControl>
                  <Input
                     type="text"
                     value={inputValue}
                     onChange={handleChange}
                     placeholder="address"
                  />
                  {displayBadAddress ? (
                     <Alert mt={1} status="error">
                        <AlertIcon />
                        Bad format address
                     </Alert>
                  ) : null}
               </FormControl>
               <Button
                  isLoading={isLoading}
                  type="submit"
                  colorScheme="blue"
                  marginTop="4"
               >
                  Add
               </Button>
            </form>
         </Box>
      </div>
   );
}

export default AddVoter;
