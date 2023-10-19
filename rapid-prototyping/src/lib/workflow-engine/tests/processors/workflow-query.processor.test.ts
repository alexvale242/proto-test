import { describe, expect, it } from 'vitest';
import { WorkflowState } from '../../models/workflow-state.model';
import workflowQueryProcessor from '../../processors/workflow-query.processor';
import workflowUtils from '../../workflow-utils';
import testUtils from '../test-utils';

describe('workflow query processor', () => {
    it('query moves first step to queried', () => {
        const workflow = testUtils.getStandardWorkflowSteps();
        const result = workflowQueryProcessor.query(workflow);

        expect(result.steps[0].workflowState).toBe(WorkflowState.queried);
    });

    it('query moves other steps to not-started', () => {
        const workflow = testUtils.getMostlyCompletedWorkflowSteps();
        const result = workflowQueryProcessor.query(workflow);

        const otherStepWorkflowStates = result.steps.slice(1, result.steps.length - 1).map(o => o.workflowState);

        expect(otherStepWorkflowStates.filter(o => o !== WorkflowState.notStarted).length === 0).toBe(true);
    });

    it('resolve query sets first step to in progress', () => {
        const workflow = testUtils.getQueriedWorkflowSteps();
        const result = workflowQueryProcessor.resolveQuery(workflow);

        expect(result.steps[0].workflowState).toBe(WorkflowState.inprogress);
    });

    it('query handles workflow with no steps', () => {
        const workflow = testUtils.getEmptyWorkflowSteps();
        const result = workflowQueryProcessor.query(workflow);

        expect(result.steps).toBe(workflow.steps);
    });

    it('resolve query handles workflow with no steps', () => {
        const workflow = testUtils.getEmptyWorkflowSteps();
        const result = workflowQueryProcessor.resolveQuery(workflow);

        expect(result.steps).toBe(workflow.steps);
    });

    it('query handles completed workflow', () => {
        const workflow = testUtils.getCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.query(workflow);
        const result = workflowUtils.isWorkflowComplete(newWorkflow);

        expect(result).toBe(true);
    });

    it('resolve query handles completed workflow', () => {
        const workflow = testUtils.getCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.resolveQuery(workflow);
        const result = workflowUtils.isWorkflowComplete(newWorkflow);

        expect(result).toBe(true);
    });
});
