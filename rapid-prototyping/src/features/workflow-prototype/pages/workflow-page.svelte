<script lang="ts">
    import MockConfigDraw from "../../../lib/mock-config-draw.svelte";
    import { WorkflowState } from '../../../lib/workflow-engine/models/workflow-state.model';
    import ClaimActivity from "../components/claim-activity.svelte";
    import ClaimDetails from "../components/claim-details.svelte";
    import QueryPanel from "../components/query-panel.svelte";
    import WorkfowBar from "../components/workflow-bar.svelte";
    import WorkflowConfig from "../components/workflow-config.svelte";
    import claimActivityMock from "../services/claim-activity-mock";
    import workflowMockService from "../services/workflow-mock";

    function approveStep() {
        approveConfirmModalOpen = false;
        workflowMockService.approve();
    }

    function resetWorkflow() {
        workflowMockService.resetSteps();
        claimActivityMock.resetComments();
    }

    let workflowIsQueried = false;
    const defaultQueryText = "The workflow for this claim has been queried by X. The matter is with Y to resolve.";
    let queryText = defaultQueryText;

    workflowMockService.workflowState.subscribe((workflow) => {
        workflowIsQueried = workflowMockService.getWorkflowInQuery(workflow);
        const draftTeamLabel = workflow.steps[0].label;
        const queriedTeamIndex = workflow.steps.findIndex(o => o.workflowState === WorkflowState.queried)
        let queriedTeamLabel = "";
        if (queriedTeamIndex !== -1) {
            queriedTeamLabel = workflow.steps[queriedTeamIndex].label;
        }
        queryText = `The workflow for this claim has been queried by ${queriedTeamLabel}. The matter is with ${draftTeamLabel} to resolve.`;
    });

    let queryModalOpen = false;

    function openQueryModalPanel() {
        queryModalOpen = true;
    }

    let approveConfirmModalOpen = false;

    function openApproveConfirmModalPanel() {
        approveConfirmModalOpen = true;
    }

    function closeApproveConfirmModalPanel() {
        approveConfirmModalOpen = false;
    }

    $: queryMode = false;

    function toggleQueryMode() {
        queryMode = !queryMode;

        if (queryMode) {
            var commentInput = document.getElementById("comment-input");
            commentInput?.focus();
        }
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
                message={queryText}
                size="fill"
            />
            <button
                class="query-button eds-button"
                on:click={openQueryModalPanel}>Resolve query</button
            >
        </div>
    {/if}
    <div class="details-container">
        <ClaimDetails />
    </div>
    <div class="activity-container">
        <ClaimActivity bind:queryModeEnabled={queryMode} />
    </div>
</div>

<!-- Workflow bar section -->
<section class="workflow-bar__container">
    <WorkfowBar />
    <button
        class="eds-button start-query-button"
        disabled={workflowIsQueried}
        on:click={toggleQueryMode}
    >
        {#if queryMode}
            Cancel query
        {:else}
            Query
        {/if}
    </button>
    <button
        class="eds-button eds-button--prominent approve-button"
        disabled={workflowIsQueried}
        on:click={openApproveConfirmModalPanel}
    >
        Approve
    </button>
</section>

<MockConfigDraw>
    <WorkflowConfig></WorkflowConfig>
</MockConfigDraw>

<!-- Query resolution modal panel -->
<QueryPanel bind:modalOpen={queryModalOpen}></QueryPanel>

<!-- Approval confirmation modal panel -->
<eds-modal
    id="query-modal"
    open={approveConfirmModalOpen}
    size="fitcontent"
    usecontrolregion="true"
    controlregionstyle="unstyled"
    disableclickoutside="true"
>
    <div slot="body">
        <h2>Confirm approval</h2>
        <p>Are you sure you want approve this Claim?</p>
    </div>

    <div slot="control-region" style="padding: 0 2rem;">
        <button
            class="eds-button eds-button--prominent"
            style="margin-right: 1rem;"
            id="dialog-example-modal--done-button"
            on:click={approveStep}>Yes</button
        >
        <button
            class="eds-button"
            id="dialog-example-modal--cancel-button"
            on:click={closeApproveConfirmModalPanel}>No</button
        >
    </div>
</eds-modal>

<style lang="scss">
    .workflow-bar__container {
        button {
            margin: 0.5rem 0.5rem;
            height: 2rem;
        }
        .start-query-button {
            margin-left: 2rem;
        }
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
        top: -42px;
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
