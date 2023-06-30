"use client";
import { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Admin from "./Admin/Admin";
import Voters from "./Voter/Voters";
import {  useContractRead, useAccount } from "wagmi";
import Contract from "../public/Voting.json";



function Main() {
   const [mounted, setMounted] = useState(false);
   const { address: addrAccount } = useAccount();



   const { data: owner } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "owner",
      account: addrAccount,
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
         <Tabs variant="enclosed">
            <TabList>


            {  addrAccount === owner && (
               <Tab>Admin</Tab>
            )}


               {  addrAccount !== owner && (
               <Tab>Voters</Tab>

               )}
            </TabList>

            <TabPanels>

         
              
            
               
               
               <TabPanel>
                  <Admin />

               </TabPanel>
          

            

               <TabPanel>
                  <Voters />
               </TabPanel>
             






            </TabPanels>
         </Tabs>
         
      </div>
   );
}

export default Main;
