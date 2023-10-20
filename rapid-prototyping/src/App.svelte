<script lang="ts">
  import WorkflowPage from './features/workflow-prototype/pages/workflow-page.svelte';
  import AppHeader from './lib/app-header.svelte';
  import MockConfigDraw from './lib/mock-config-draw.svelte';
</script>

<main>
  <section class="heading">
    <AppHeader />
  </section>
  <WorkflowPage />
</main>

<style>
    .heading {
        height: 4rem;
    }
</style>
