"use client";
import { useContractRead, useContractEvent } from "wagmi";
import {
   Step,
   StepDescription,
   StepIcon,
   StepIndicator,
   StepNumber,
   StepSeparator,
   StepStatus,
   StepTitle,
   Stepper,
   useSteps,
   Box,
   useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useVoteContext } from "@/components/voteContext";
import Contract from "../../backend/artifacts/contracts/Voting.sol/Voting.json";

function WorkflowStatus({ allowChangeStatus }) {
   const { workflowStatus, setWorkFlowStatus } = useVoteContext();
   const toast = useToast();
   const steps = [
      { title: "RegisteringVoters", description: "" },
      { title: "ProposalsRegistrationStarted", description: "" },
      { title: "ProposalsRegistrationEnded", description: "" },
      { title: "VotingSessionStarted", description: "" },
      { title: "VotingSessionEnded", description: "" },
      { title: "VotesTallied", description: "" },
   ];

   const {
      data: currentWorkflowStatus,
      isLoading,
      error,
      refetch,
   } = useContractRead({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      functionName: "workflowStatus",
      onError(error) {
         console.log("Error", error);
      },
   });

   const { activeStep, setActiveStep } = useSteps({
      index: currentWorkflowStatus + 1,
      count: steps.length,
   });

   const getStatusLabel = (status) => {
      switch (status) {
         case 1:
            return "New status : ProposalsRegistrationStarted";
         case 2:
            return "New status : ProposalsRegistrationEnded";
         case 3:
            return "New status : VotingSessionStarted";
         case 4:
            return "New status : VotingSessionEnded";
         case 5:
            return "New status : VotesTallied";
      }
   };

   useContractEvent({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: Contract.abi,
      eventName: "WorkflowStatusChange",
      listener(event) {
         refetch();
         toast({
            status: "success",
            isClosable: true,
            position: "top-middle",
            title: "Voting session changed",
            description: getStatusLabel(event[0].args.newStatus),
         });
         unwatch();
      },
   });

   useEffect(() => {
      setWorkFlowStatus(currentWorkflowStatus);
      setActiveStep(currentWorkflowStatus);
   }, [currentWorkflowStatus]);

   console.log("WorkflowStatus : ", currentWorkflowStatus);

   return (
      <div>
         <Box marginLeft="60px" marginRight="60px">
            <Stepper size="lg" index={activeStep}>
               {steps.map((step, index) => (
                  <Step key={index}>
                     <StepIndicator>
                        <StepStatus
                           complete={<StepIcon />}
                           incomplete={<StepNumber />}
                           active={<StepNumber />}
                        />
                     </StepIndicator>

                     <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                     </Box>

                     <StepSeparator />
                  </Step>
               ))}
            </Stepper>
         </Box>
      </div>
   );
}

export default WorkflowStatus;
