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

    public query(): void {
        this.workflowState.update((workflow) => {
            return workflowEngine.query(workflow);
        })
    }

    public resolveQuery(): void {
        this.workflowState.update((workflow) => {
            return workflowEngine.resolveQuery(workflow);
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
}

export default new WorkflowMockService();
