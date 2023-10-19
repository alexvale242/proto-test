import { writable } from 'svelte/store';
import type { WorkflowStep } from '../../../lib/workflow-engine/models/workflow-step.model';
import { WorkflowState } from '../../../lib/workflow-engine/models/workflow-state.model';

export class WorkflowMockService {
    constructor() { }

    private defaultWorkflowSteps: WorkflowStep[] = [
        {
            label: 'step-1',
            workflowState: 2
        },
        {
            label: 'step-2',
            workflowState: 2
        },
        {
            label: 'step-3',
            workflowState: 2
        },
        {
            label: 'step-4',
            workflowState: 1
        },
        {
            label: 'step-5',
            workflowState: 0
        },
        {
            label: 'step-6',
            workflowState: 0
        },
        {
            label: 'step-7',
            workflowState: 0
        }
    ]

    private smallWorkflowSteps: WorkflowStep[] = [
        {
            label: 'step-1',
            workflowState: 2
        },
        {
            label: 'step-2',
            workflowState: 1
        },
        {
            label: 'step-3',
            workflowState: 0
        },

    ]

    public workflowState = writable({ steps: this.defaultWorkflowSteps });

    public resetSteps(): void {
        this.workflowState.update((state) => { return { ...state, steps: this.smallWorkflowSteps } });
    }

    public approveStep(): void {
        this.workflowState.update((state) => {
            const steps = state.steps;
            const stepIndex = steps.findIndex(o => o.workflowState === WorkflowState.inprogress);
            steps[stepIndex].workflowState = WorkflowState.complete;
            steps[stepIndex + 1].workflowState = WorkflowState.inprogress;
            return { ...state, steps: steps}
        })
    }
}

export default new WorkflowMockService();
