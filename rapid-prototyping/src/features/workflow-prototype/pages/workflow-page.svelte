<script lang="ts">
    import MockConfigDraw from "../../../lib/mock-config-draw.svelte";
    import ClaimActivity from "../components/claim-activity.svelte";
    import ClaimDetails from "../components/claim-details.svelte";
    import QueryPanel from '../components/query-panel.svelte';
    import WorkfowBar from "../components/workflow-bar.svelte";
    import WorkflowConfig from '../components/workflow-config.svelte';
    import claimActivityMock from '../services/claim-activity-mock';
    import workflowMockService from "../services/workflow-mock";

    function approveStep() {
        workflowMockService.approve();
    }

    function resetWorkflow() {
        workflowMockService.resetSteps();
        claimActivityMock.resetComments();
    }

    let workflowIsQueried = false;
    const defaultQueryText = 'The workflow for this claim has been queried: ';
    let queryText = defaultQueryText;

    workflowMockService.workflowState.subscribe((workflow) => {
        workflowIsQueried = workflowMockService.getWorkflowInQuery(workflow);
        queryText = defaultQueryText + workflow.queryMessage;
    });

    let queryModalOpen = false;

    function openModalPanel() {
        queryModalOpen = true;
    }
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
                message="{queryText}"
                size="fill"
            />
            <button class="query-button eds-button" on:click={openModalPanel}
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
<QueryPanel bind:modalOpen={queryModalOpen}></QueryPanel>

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
        padding-left: 2rem;
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
