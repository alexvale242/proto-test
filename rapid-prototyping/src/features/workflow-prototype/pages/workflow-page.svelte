<script lang="ts">
    import WorkfowBar from "../components/workflow-bar.svelte";
    import ClaimActivity from "../components/claim-activity.svelte";
    import ClaimDetails from "../components/claim-details.svelte";
    import MockConfigDraw from "../../../lib/mock-config-draw.svelte";
    import MockControls from "../components/mock-controls.svelte";
    import workflowMockService from "../services/workflow-mock";
    import claimActivityMock from '../services/claim-activity-mock';
    import WorkflowConfig from '../components/workflow-config.svelte';
    import WorkflowBarDetails from '../components/workflow-bar-details.svelte';

    function approveStep() {
        workflowMockService.approve();
    }

    function resolveQuery() {
        workflowMockService.resolveQuery();
    }

    function resetWorkflow() {
        workflowMockService.resetSteps();
        claimActivityMock.resetComments();
    }

    let workflowIsQueried = false;

    workflowMockService.workflowState.subscribe((workflow) => {
        workflowIsQueried = workflowMockService.getWorkflowInQuery(workflow);
    });
</script>

<div class="page-heading">
    <h1>Manage claim</h1>
    <button class="corner-control" on:click={resetWorkflow}>Reset</button>
</div>
<div class="page-container {workflowIsQueried ? 'queried' : ''}">
    {#if workflowIsQueried}
        <div class="query-message-container">
            <eds-info-message
                class="query-message"
                status="warning"
                display="block"
                message="The workflow for this claim has been queried, copy text copy text blah blah blah"
                size="fill"
            />
            <button class="query-button eds-button" on:click={resolveQuery}
                >Resolve query</button
            >
        </div>
    {/if}
    <div class="details-container">
        <ClaimDetails />
    </div>
    <div class="activity-container">
        <ClaimActivity />
    </div>
</div>

<section class="workflow-bar__container">
    <WorkfowBar />
    <button class="eds-button eds-button--prominent" disabled={workflowIsQueried} on:click={approveStep}>
        Approve
    </button>
</section>

<MockConfigDraw>
    <!-- <MockControls /> -->
    <WorkflowConfig></WorkflowConfig>
</MockConfigDraw>

<style lang="scss">
    button {
        margin: 0.5rem 1rem;
        height: 2rem;
    }

    .page-heading {
        padding-top: 2rem;
        padding-left: 2rem;
    }

    .workflow-bar__container {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        border: 1px solid var(--eds-brand-color-border-base);
        background-color: var(--eds-brand-color-background-base);

        display: flex;
    }

    .page-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 1rem;
        column-gap: 2rem;
        padding: 0 2rem;
        height: calc(100svh - 15rem);
        width: 100%;
    }

    .query-message-container {
        grid-column: span 2;
        height: 3.5rem;
    }

    .activity-container {
        border-left: 1px solid var(--eds-brand-color-border-base);
        padding-left: 2rem;
        padding-bottom: 2rem;
        padding-top: 1rem;
    }

    .corner-control {
        position: fixed;
        top: 0;
        right: 6rem;
        z-index: 300;
        margin: 0;
        border: 1px solid var(--eds-brand-color-border-base);

        &:hover {
            background-color: var(--eds-brand-color-background-base);
        }
    }

    .query-message {
        display: block;
    }

    .query-button {
        margin: 0;
        position: relative;
        top: -2.75rem;
        right: 3rem;
        float: right;

        background-color: var(--eds-color-orange-10);
        border: 1px solid var(--eds-brand-color-status-warning);

        &:hover {
            border: 1px solid var(--eds-brand-color-status-warning) !important;
            background-color: var(--eds-brand-color-status-warning);
            color: white;
        }
    }
</style>
