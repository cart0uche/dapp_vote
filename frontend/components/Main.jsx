"use client";
import { useState, useEffect } from "react";
import {
   Tabs,
   TabList,
   TabPanels,
   Tab,
   TabPanel,
   Text,
   Box,
} from "@chakra-ui/react";
import Admin from "./Admin/Admin";
import Voters from "./Voter/Voters";
import { useContractRead, useAccount } from "wagmi";
import Contract from "../public/Voting.json";
import { useVoteContext } from "@/components/voteContext";
import { fetchVoters } from "./fetchData.jsx";

function Main() {
   const { newVoter } = useVoteContext();
   const [mounted, setMounted] = useState(false);
   const [voters, setVoters] = useState([]);
   const [isVoter, setIsVoter] = useState(false);
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

   // un peu tricky : dès qu'un nouveau voter est ajouté on recupere ici la liste des voters pour vérifier si le
   // compte courant s'y trouve (seulement si on est pas déjà un votant)
   useEffect(() => {
      const _fetchVoters = async () => {
         if (isVoter === false) {
            await fetchVoters(setVoters);
         }
      };
      _fetchVoters();
   }, [newVoter]);

   useEffect(() => {
      voters.forEach((voter) => {
         if (voter.address === addrAccount) {
            setIsVoter(true);
         }
      });
   }, [voters]);

   if (!mounted) return <></>;

   return (
      <div>
         <Tabs variant="enclosed">
            <TabList>
               {addrAccount === owner && <Tab>Admin</Tab>}
               <Tab>Voters</Tab>
            </TabList>

            <TabPanels>
               {addrAccount === owner ? (
                  <TabPanel>
                     <Admin />
                  </TabPanel>
               ) : null}
               {isVoter ? (
                  <TabPanel>
                     <Voters />
                  </TabPanel>
               ) : (
                  <Box
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                  >
                     <Text fontSize="xl" marginTop="2rem">
                        Ask the admin to add you in the voters list
                     </Text>
                  </Box>
               )}
            </TabPanels>
         </Tabs>
      </div>
   );
}

export default Main;
