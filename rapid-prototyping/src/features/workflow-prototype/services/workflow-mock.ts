import { writable } from 'svelte/store';

export class WorkflowMockService {
    constructor() { }

    private defaultWorkflowSteps: WorkflowStep[] = [
        {
            label: 'step-1',
            workflowState: 1
        },
        {
            label: 'step-2',
            workflowState: 1
        },
        {
            label: 'step-3',
            workflowState: 3
        },
        {
            label: 'step-4',
            workflowState: 0
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
            workflowState: 1
        },
        {
            label: 'step-2',
            workflowState: 3
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

export interface WorkflowStep {
    label: string;
    workflowState: WorkflowState;
}

export enum WorkflowState {
    incomplete,
    complete,
    queried,
    inprogress
}

export interface Workflow {
    steps: WorkflowStep[];
}
