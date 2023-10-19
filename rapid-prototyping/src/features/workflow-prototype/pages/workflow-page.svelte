<script lang="ts">
  import WorkfowBar from '../components/workflow-bar.svelte';
  import ClaimActivity from '../components/claim-activity.svelte';
  import ClaimDetails from '../components/claim-details.svelte';
  import MockConfigDraw from '../../../lib/mock-config-draw.svelte';
  import MockControls from '../components/mock-controls.svelte';
  import workflowMockService from '../services/workflow-mock';

  function approveStep() {
    workflowMockService.approve();
  }

  function queryStep() {
    workflowMockService.query();
  }

  function resetWorkflow() {
    workflowMockService.resetSteps();
  }
</script>

<div class="page-heading">
  <h1>Manage claim</h1>
  <button class="eds-button corner-control" on:click={resetWorkflow}>Reset</button>
</div>
<div class="page-container">
  <div class="details-container">
    <ClaimDetails />
  </div>
  <div class="activity-container">
    <ClaimActivity />
  </div>
</div>

<section class="workflow-bar__container">
  <WorkfowBar />
  <button class="eds-button eds-button--prominent" on:click={approveStep}>Approve</button>
  <button class="eds-button" on:click={queryStep}>Query</button>
</section>

<MockConfigDraw>
  <MockControls />
</MockConfigDraw>

<style lang="scss">
  button {
    margin: 0.5rem 1rem;
    height: 2rem;
  }
  .details-container {
    margin-right: 2rem;
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
    padding: 0 2rem;
  }

  .activity-container {
    border-left: 1px solid var(--eds-brand-color-border-base);
    padding-left: 2rem;
  }

  .corner-control {
    position: fixed;
    top: 6rem;
    right: 0;
  }
</style>
