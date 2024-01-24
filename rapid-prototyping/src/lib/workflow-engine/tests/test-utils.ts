import { WorkflowState } from '../models/workflow-state.model';
import type { Workflow } from '../models/workflow.model';

export class TestUtils {
    public getStandardWorkflowSteps(): Workflow {
        return {
            steps: [
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

            ]
        }
    }

    public getSingleWorkflowStep(): Workflow {
        return {
            steps: [
                {
                    label: 'step-1',
                    workflowState: WorkflowState.inprogress
                }
            ]
        }
    }

    public getMostlyCompletedWorkflowSteps(): Workflow {
        return {
            steps: [
                {
                    label: 'step-1',
                    workflowState: WorkflowState.complete
                },
                {
                    label: 'step-2',
                    workflowState: WorkflowState.complete
                },
                {
                    label: 'step-3',
                    workflowState: WorkflowState.inprogress
                },

            ]
        }
    }

    public getQueriedWorkflowSteps(): Workflow {
        return {
            steps: [
                {
                    label: 'step-1',
                    workflowState: WorkflowState.queried
                },
                {
                    label: 'step-2',
                    workflowState: WorkflowState.notStarted
                },
                {
                    label: 'step-3',
                    workflowState: WorkflowState.notStarted
                },

            ]
        }
    }

    public getHalfCompleteQueriedWorkflowSteps(): Workflow {
        return {
            steps: [
                {
                    label: 'step-1',
                    workflowState: WorkflowState.complete
                },
                {
                    label: 'step-2',
                    workflowState: WorkflowState.queried
                },
                {
                    label: 'step-3',
                    workflowState: WorkflowState.notStarted
                },

            ]
        }
    }

    public getCompletedWorkflowSteps(): Workflow {
        return {
            steps: [
                {
                    label: 'step-1',
                    workflowState: WorkflowState.complete
                },
                {
                    label: 'step-2',
                    workflowState: WorkflowState.complete
                },
                {
                    label: 'step-3',
                    workflowState: WorkflowState.complete
                },

            ]
        }
    }

    public getEmptyWorkflowSteps(): Workflow {
        return {
            steps: []
        }
    }
}

export default new TestUtils();
