import { describe, expect, it } from 'vitest';
import { WorkflowState } from '../../models/workflow-state.model';
import workflowQueryProcessor from '../../processors/workflow-query.processor';
import workflowUtils from '../../workflow-utils';
import testUtils from '../test-utils';

describe('workflow query processor', () => {
    it('query moves active step to queried', () => {
        const workflow = testUtils.getMostlyCompletedWorkflowSteps();
        const activeStepIndex = workflow.steps.findIndex(o => o.workflowState === WorkflowState.inprogress)
        const result = workflowQueryProcessor.query(workflow);

        expect(result.steps[activeStepIndex].workflowState).toBe(WorkflowState.queried);
    });

    it('query handles workflow with no steps', () => {
        const workflow = testUtils.getEmptyWorkflowSteps();
        const result = workflowQueryProcessor.query(workflow);

        expect(result.steps).toBe(workflow.steps);
    });

    it('query handles completed workflow', () => {
        const workflow = testUtils.getCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.query(workflow);
        const result = workflowUtils.isWorkflowComplete(newWorkflow);

        expect(result).toBe(true);
    });

    it('continue workflow handles workflow with no steps', () => {
        const workflow = testUtils.getEmptyWorkflowSteps();
        const result = workflowQueryProcessor.continueWorkflow(workflow);

        expect(result.steps).toBe(workflow.steps);
    });

    it('continue workflow sets queried step to in progress', () => {
        const workflow = testUtils.getHalfCompleteQueriedWorkflowSteps();
        const queriedStepIndex = workflow.steps.findIndex(o => o.workflowState === WorkflowState.queried);
        const result = workflowQueryProcessor.continueWorkflow(workflow);

        expect(result.steps[queriedStepIndex].workflowState).toBe(WorkflowState.inprogress);
    });

    it('continue workflow does not affect non-active steps', () => {
        const workflow = testUtils.getHalfCompleteQueriedWorkflowSteps();
        const result = workflowQueryProcessor.continueWorkflow(workflow);
        const queriedStepIndex = workflow.steps.findIndex(o => o.workflowState === WorkflowState.queried);

        let otherStepsChanged = false;

        for (let i = 0; i < workflow.steps.length; i++) {
            if (i !== queriedStepIndex) {
                if (result.steps[i].workflowState !== workflow.steps[i].workflowState) {
                    otherStepsChanged = true;
                }
            }
        }

        expect(otherStepsChanged).toBe(false);
    });

    it('continue workflow handles completed workflow', () => {
        const workflow = testUtils.getCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.continueWorkflow(workflow);
        const result = workflowUtils.isWorkflowComplete(newWorkflow);

        expect(result).toBe(true);
    });

    it('restart workflow resets any complete steps', () => {
        const workflow = testUtils.getMostlyCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.restartWorkflow(workflow);
        const noStepsAreComplete = newWorkflow.steps.filter(o => o.workflowState === WorkflowState.complete).length === 0;


        expect(noStepsAreComplete).toBe(true);
    });

    it('restart workflow sets first step to be in progress', () => {
        const workflow = testUtils.getMostlyCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.restartWorkflow(workflow);
        const firstStepInProgress = newWorkflow.steps[0].workflowState === WorkflowState.inprogress;

        expect(firstStepInProgress).toBe(true);
    });

    it('restart workflow sets all other steps to incomplete', () => {
        const workflow = testUtils.getMostlyCompletedWorkflowSteps();
        const newWorkflow = workflowQueryProcessor.restartWorkflow(workflow);
        const allOtherStepsAreNotStarted = newWorkflow.steps.filter(o => o.workflowState === WorkflowState.notStarted).length === workflow.steps.length - 1;
        expect(allOtherStepsAreNotStarted).toBe(true);
    });

    it('restart workflow handles workflow with no steps', () => {
        const workflow = testUtils.getEmptyWorkflowSteps();
        const result = workflowQueryProcessor.restartWorkflow(workflow);

        expect(result.steps).toBe(workflow.steps);
    });
});
