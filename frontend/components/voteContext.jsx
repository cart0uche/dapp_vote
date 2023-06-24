"use client";
import { createContext, useState, useContext } from "react";

const VoteContext = createContext({});

export const VoteContextProvider = ({ children }) => {
   const [workflowStatus, setWorkFlowStatus] = useState(0);

   return (
      <VoteContext.Provider value={{ workflowStatus, setWorkFlowStatus }}>
         {children}
      </VoteContext.Provider>
   );
};

export const useVoteContext = () => useContext(VoteContext);
