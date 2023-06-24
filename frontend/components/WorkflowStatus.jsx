import React from "react";
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
} from "@chakra-ui/react";

function WorkflowStatus({ status }) {
   const steps = [
      { title: "RegisteringVoters", description: "" },
      { title: "ProposalsRegistrationStarted", description: "" },
      { title: "ProposalsRegistrationEnded", description: "" },
      { title: "VotingSessionStarted", description: "" },
      { title: "VotingSessionEnded", description: "" },
      { title: "VotesTallied", description: "" },
   ];

   const { activeStep } = useSteps({
      index: status + 1,
      count: steps.length,
   });

   return (
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
   );
}

export default WorkflowStatus;
