import { writable } from 'svelte/store';
import type { WorkflowStep } from '../../../lib/workflow-engine/models/workflow-step.model';
import { WorkflowState } from '../../../lib/workflow-engine/models/workflow-state.model';
import workflowEngine from '../../../lib/workflow-engine/workflow-engine';

export class WorkflowMockService {
    constructor() { }

    private defaultWorkflowSteps: WorkflowStep[] = [
        {
            label: 'step-1',
            workflowState: WorkflowState.inprogress
        },
        {
            label: 'step-2',
            workflowState: WorkflowState.notStarted
        },
        {
            label: 'step-3',
            workflowState: WorkflowState.notStarted
        },
        {
            label: 'step-4',
            workflowState: WorkflowState.notStarted
        },
        {
            label: 'step-5',
            workflowState: WorkflowState.notStarted
        },
        {
            label: 'step-6',
            workflowState: WorkflowState.notStarted
        },
        {
            label: 'step-7',
            workflowState: WorkflowState.notStarted
        }
    ]

    public workflowState = writable({ steps: this.defaultWorkflowSteps });

    public resetSteps(): void {
        this.workflowState.update((state) => { return { ...state, steps: this.defaultWorkflowSteps } });
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
}

export default new WorkflowMockService();
