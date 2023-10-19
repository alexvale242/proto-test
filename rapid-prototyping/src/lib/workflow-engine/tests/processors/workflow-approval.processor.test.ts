import { describe, expect, it } from 'vitest';
import { WorkflowState } from '../../models/workflow-state.model';
import workflowApprovalProcessor from '../../processors/workflow-approval.processor';
import workflowUtils from '../../workflow-utils';
import testUtils from '../test-utils';

describe('workflow approval processor', () => {
    it('approve moves current step from in-progress to complete', () => {
        const workflow = testUtils.getStandardWorkflowSteps();
        const inProgressStepIndex = workflowUtils.getCurrentStepIndex(workflow);
        const result = workflowApprovalProcessor.approve(workflow);

        expect(result.steps[inProgressStepIndex].workflowState).toBe(WorkflowState.complete);
    });

    it('approve moves next step from in-complete to in-progress', () => {
        const workflow = testUtils.getStandardWorkflowSteps();
        const inProgressStepIndex = workflowUtils.getCurrentStepIndex(workflow);
        const result = workflowApprovalProcessor.approve(workflow);

        expect(result.steps[inProgressStepIndex + 1].workflowState).toBe(WorkflowState.inprogress);
    });

    it('approve handles there being no next step', () => {
        const workflow = testUtils.getSingleWorkflowStep();

        const inProgressStepIndex = workflowUtils.getCurrentStepIndex(workflow);
        const result = workflowApprovalProcessor.approve(workflow);

        expect(result.steps[inProgressStepIndex].workflowState).toBe(WorkflowState.complete);
    })

    it('approve handles workflow with no steps', () => {
        const workflow = testUtils.getEmptyWorkflowSteps();
        const result = workflowApprovalProcessor.approve(workflow);

        expect(result.steps).toBe(workflow.steps);
    });

    it('approve handles completed workflow', () => {
        const workflow = testUtils.getCompletedWorkflowSteps();
        const result = workflowApprovalProcessor.approve(workflow);

        expect(result.steps).toBe(workflow.steps);
    });

    it('approve handles queried workflow', () => {
        const workflow = testUtils.getQueriedWorkflowSteps();
        const result = workflowApprovalProcessor.approve(workflow);

        expect(result.steps).toBe(workflow.steps);
    });
});
