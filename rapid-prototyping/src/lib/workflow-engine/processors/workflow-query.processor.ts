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

        const newSteps = workflow.steps;

        for (let i = 0; i < newSteps.length; i++) {
            if (i === 0) {
                newSteps[0].workflowState = WorkflowState.queried;
            } else {
                newSteps[i].workflowState = WorkflowState.notStarted;
            }
        }

        return workflowUtils.createNewWorkflowWithSteps(workflow.steps);
    }

    public resolveQuery(workflow: Workflow): Workflow {
        if (workflow.steps.length === 0) {
            return workflow;
        }

        if (workflowUtils.isWorkflowComplete(workflow)) {
            return workflow;
        }

        const newSteps = workflow.steps;

        newSteps[0].workflowState = WorkflowState.inprogress;

        return workflowUtils.createNewWorkflowWithSteps(workflow.steps);
    }
}


export default new WorkflowQueryProcessor();
