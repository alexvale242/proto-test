import type { WorkflowState } from './workflow-state.model';

export interface WorkflowStep {
    label: string;
    workflowState: WorkflowState;
}
