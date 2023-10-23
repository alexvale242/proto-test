<script lang="ts">
    import { onMount } from 'svelte';
    import { WorkflowState } from '../../../lib/workflow-engine/models/workflow-state.model';
    import workflowMockService from "../services/workflow-mock";
    import StatusBox from './status-box.svelte';

    let readonlyMode = false;

    onMount(async () => {
        try {
            workflowMockService.workflowState.subscribe((workflow) => {
                const workflowState = workflowMockService.getWorkflowStatus(workflow);
                readonlyMode = workflowState !== WorkflowState.notStarted;
            });
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });
</script>

<form class="eds-stack eds-form">
    <fieldset class="eds-fieldset">
        <div class="eds-grid-form">
            <div>
                <eds-form-field label="Name" name="name">
                    <input
                        class="eds-input {readonlyMode ? 'eds-read-only' : ''}"
                        id="name"
                        name="name"
                        type="text"
                        value="Q4 Example Claim"
                        readonly={readonlyMode}
                    />
                </eds-form-field>
                <StatusBox />
                <eds-form-field
                    label="Value (CUR)"
                    name="value"
                    readonly="true"
                >
                    <input
                        class="eds-input eds-read-only"
                        id="value"
                        name="value"
                        type="text"
                        value="13.17"
                        readonly
                    />
                </eds-form-field>
                <eds-form-field label="Partner" name="partner" readonly="true">
                    <input
                        class="eds-input eds-read-only"
                        id="partner"
                        name="partner"
                        type="text"
                        value="Enable Electronics"
                        readonly
                    />
                </eds-form-field>
                <eds-form-field
                    label="Agreement"
                    name="agreement"
                    readonly="true"
                >
                    <input
                        class="eds-input eds-read-only"
                        id="agreement"
                        name="agreement"
                        type="text"
                        value="2022 Example Agreement"
                        readonly
                    />
                </eds-form-field>
                <eds-form-field
                    label="Start date"
                    name="start-date"
                    readonly="true"
                >
                    <input
                        class="eds-input eds-read-only"
                        id="start-date"
                        name="start-date"
                        type="text"
                        value="08/11/2022"
                        readonly
                    />
                </eds-form-field>
                <eds-form-field
                    label="End date"
                    name="end-date"
                    readonly="true"
                >
                    <input
                        class="eds-input eds-read-only"
                        id="end-date"
                        name="end-date"
                        type="text"
                        value="12/11/2022"
                        readonly
                    />
                </eds-form-field>
            </div>
        </div>
    </fieldset>
</form>

<style lang="scss">
    /* your styles go here */
    fieldset {
        padding: 0 !important;
        margin: 0 !important;
    }
</style>
