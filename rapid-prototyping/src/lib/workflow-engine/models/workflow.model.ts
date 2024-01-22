import type { WorkflowStep } from './workflow-step.model';

export interface Workflow {
    steps: WorkflowStep[];
    queryMessage?: string;
    queryRaisedBy?: string;
}
