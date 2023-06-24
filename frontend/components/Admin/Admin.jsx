import ChangeWorkflowStatus from "./ChangeWorkflowStatus";
import WorkflowStatus from "../WorkflowStatus";

function Admin() {
   return (
      <div>
         <WorkflowStatus />
         <ChangeWorkflowStatus />
      </div>
   );
}

export default Admin;
