import { WorkflowState } from '../models/workflow-state.model';
import type { Workflow } from '../models/workflow.model';
import workflowUtils from '../workflow-utils';
export class WorkflowQueryProcessor {

    public query(workflow: Workflow): Workflow {
        if (workflow.steps.length === 0) {
            return workflow;
        }

        if (workflowUtils.isWorkflowComplete(workflow)) {
            return workflow;
        }

        const newSteps = JSON.parse(JSON.stringify(workflow.steps));;

        const activeStepIndex = workflow.steps.findIndex(o => o.workflowState === WorkflowState.inprogress);

        newSteps[activeStepIndex].workflowState = WorkflowState.queried;

        return workflowUtils.createNewWorkflowWithSteps(newSteps);
    }

    public continueWorkflow(workflow: Workflow): Workflow {
        if (workflow.steps.length === 0) {
            return workflow;
        }

        if (workflowUtils.isWorkflowComplete(workflow)) {
            return workflow;
        }

        const newSteps = JSON.parse(JSON.stringify(workflow.steps));
        const queriedStepIndex = workflow.steps.findIndex(o => o.workflowState === WorkflowState.queried);

        newSteps[queriedStepIndex].workflowState = WorkflowState.inprogress;

        return workflowUtils.createNewWorkflowWithSteps(newSteps);
    }

    public restartWorkflow(workflow: Workflow): Workflow {
        if (workflow.steps.length === 0) {
            return workflow;
        }

        if (workflowUtils.isWorkflowComplete(workflow)) {
            return workflow;
        }

        const newSteps = JSON.parse(JSON.stringify(workflow.steps));
        for (let i = 0; i < newSteps.length; i++) {
            if (i === 0) {
                newSteps[0].workflowState = WorkflowState.inprogress;
            } else {
                newSteps[i].workflowState = WorkflowState.notStarted;
            }
        }

        return workflowUtils.createNewWorkflowWithSteps(newSteps);
    }
}

export default new WorkflowQueryProcessor();
