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
            workflowState: 2
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
            workflowState: 0
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
