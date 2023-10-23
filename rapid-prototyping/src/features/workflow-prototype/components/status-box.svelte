<script lang="ts">
    import { onMount } from "svelte";
    import { WorkflowState } from "../../../lib/workflow-engine/models/workflow-state.model";
    import workflowMockService from "../services/workflow-mock";

    let workflowState = WorkflowState.notStarted;
    let workflowString = '';

    function getWorkflowStatusString(state: WorkflowState): string {
        switch (state) {
            case WorkflowState.notStarted: {
                return 'Open'
            }
            case WorkflowState.inprogress: {
                return 'In workflow'
            }
            case WorkflowState.complete: {
                return 'Posted'
            }

            case WorkflowState.queried: {
                return 'Queried'
            }
            default: {
                return 'Open'
            }
        }
    }

    onMount(async () => {
        try {
            workflowMockService.workflowState.subscribe((workflow) => {
                workflowState = workflowMockService.getWorkflowStatus(workflow);
                workflowString = getWorkflowStatusString(workflowState);
            });
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });
</script>

<eds-form-field label="Status" name="status">
    <input
        class="eds-input eds-read-only"
        id="status"
        name="status"
        type="text"
        bind:value={workflowString}
        readonly
    />
</eds-form-field>

<style lang="scss">
    /* your styles go here */
</style>
