import { WorkflowState } from '../models/workflow-state.model';
import type { Workflow } from '../models/workflow.model';
import workflowUtils from '../workflow-utils';
export class WorkflowApprovalProcessor {

    public approve(workflow: Workflow): Workflow {
        if (workflow.steps.length === 0) {
            return workflow;
        }

        if (workflowUtils.isWorkflowComplete(workflow)) {
            return workflow;
        }

        if (workflowUtils.isWorkflowQueried(workflow)) {
            return workflow;
        }

        const currentStepIndex = workflowUtils.getCurrentStepIndex(workflow);

        workflow.steps[currentStepIndex].workflowState = WorkflowState.complete;

        if (workflow.steps.length > currentStepIndex + 1) {
            workflow.steps[currentStepIndex + 1].workflowState = WorkflowState.inprogress;
        }

        return workflowUtils.createNewWorkflowWithSteps(workflow.steps);
    }
}


export default new WorkflowApprovalProcessor();
