"use client";
import { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Admin from "./Admin/Admin";
import Voters from "./Voter/Voters";

function Main() {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);
   if (!mounted) return <></>;

   return (
      <div>
         <Tabs variant="enclosed">
            <TabList>
               <Tab>Admin</Tab>
               <Tab>Voters</Tab>
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
         ;
      </div>
   );
}

export default Main;
