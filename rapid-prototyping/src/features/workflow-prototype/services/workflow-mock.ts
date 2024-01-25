import { writable } from 'svelte/store';
import type { WorkflowStep } from '../../../lib/workflow-engine/models/workflow-step.model';
import { WorkflowState } from '../../../lib/workflow-engine/models/workflow-state.model';
import workflowEngine from '../../../lib/workflow-engine/workflow-engine';
import type { Workflow } from '../../../lib/workflow-engine/models/workflow.model';
import workflowUtils from '../../../lib/workflow-engine/workflow-utils';

export class WorkflowMockService {
    constructor() { }

    private getDefaultWorkflow(): Workflow {
        return {
            steps: [{
                label: 'Commercial',
                workflowState: WorkflowState.inprogress
            },
            {
                label: 'Finance',
                workflowState: WorkflowState.notStarted
            },
            {
                label: 'Accounts Receivable',
                workflowState: WorkflowState.notStarted
            }]
        }
    }

    public workflowState = writable(this.getDefaultWorkflow());

    public resetSteps(): void {
        this.workflowState.update((state) => { return this.getDefaultWorkflow() });
    }

    public approve(): void {
        this.workflowState.update((workflow) => {
            return workflowEngine.approve(workflow);
        })
    }

    public query(comment: string, queryRaisedBy: string): void {
        this.workflowState.update((workflow) => {
            const newWorkflow = workflowEngine.query(workflow);
            newWorkflow.queryMessage = comment;
            newWorkflow.queryRaisedBy = queryRaisedBy;
            return newWorkflow;
        })
    }

    public continueWorkflow(): void {
        this.workflowState.update((workflow) => {
            return workflowEngine.continueWorkflow(workflow);
        })
    }

    public restartWorkflow(): void {
        this.workflowState.update((workflow) => {
            return workflowEngine.restartWorkflow(workflow);
        })
    }

    public getWorkflowInQuery(workflow: Workflow): boolean {
        return workflowUtils.isWorkflowQueried(workflow);
    }

    public setWorkflowSteps(workflowSteps: WorkflowStep[]) {
        const workflow: Workflow = {
            steps: workflowSteps
        };

        this.workflowState.update((state) => { return workflow });
    }

    public getWorkflowStatus(workflow: Workflow): WorkflowState {
        if (workflow === null || workflow.steps === null || workflow.steps.length === 0) {
            return WorkflowState.notStarted;
        } else if (workflowUtils.isWorkflowQueried(workflow)) {
            return WorkflowState.queried;
        } else if (workflowUtils.isWorkflowComplete(workflow)) {
            return WorkflowState.complete;
        } else {
            const currentIndex = workflowUtils.getCurrentStepIndex(workflow);
            if (currentIndex === 0) {
                return WorkflowState.notStarted;
            } else {
                return workflow.steps[currentIndex].workflowState;
            }
        }
    }
}

export default new WorkflowMockService();
