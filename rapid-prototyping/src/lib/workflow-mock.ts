export class WorkflowMockService {
    constructor() { }

    public getWorkflowSteps(): WorkflowStep[] {
        return [
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
    }
}

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
