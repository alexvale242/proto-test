<script lang="ts">
  import WorkfowBar from '../components/workflow-bar.svelte';
  import ClaimActivity from '../components/claim-activity.svelte';
  import ClaimDetails from '../components/claim-details.svelte';
</script>

<div class="page-heading">
  <h1>Manage claim</h1>
</div>
<div class="page-container">
  <div>
    <ClaimDetails />
  </div>
  <div class="activity-container">
    <ClaimActivity />
  </div>
</div>

<section class="workflow-bar__container">
  <WorkfowBar />
</section>

<style lang="scss">
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
</style>
