import { WorkflowState } from './models/workflow-state.model';
import type { WorkflowStep } from './models/workflow-step.model';
import type { Workflow } from './models/workflow.model';

export class WorkflowUtils {
    public getCurrentStepIndex(workflow: Workflow): number  {
        return workflow.steps.findIndex(o => o.workflowState === WorkflowState.inprogress);
    }

    public createNewWorkflowWithSteps(steps: WorkflowStep[]): Workflow {
        return {
            steps: steps
        };
    }
}

export default new WorkflowUtils();
