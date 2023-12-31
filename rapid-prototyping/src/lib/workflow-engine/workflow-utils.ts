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

    public isWorkflowComplete(workflow: Workflow): boolean  {
        return workflow.steps.filter(o => o.workflowState !== WorkflowState.complete).length === 0;
    }

    public isWorkflowQueried(workflow: Workflow): boolean  {
        return workflow.steps.filter(o => o.workflowState === WorkflowState.queried).length > 0;
    }
}

export default new WorkflowUtils();
