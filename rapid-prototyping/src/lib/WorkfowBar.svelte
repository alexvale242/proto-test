<script lang="ts">
  import { onMount } from 'svelte';
  import type { WorkflowStep } from './workflow-mock';
  import { WorkflowMockService } from './workflow-mock';

  let workflowSteps: WorkflowStep[] = [];

  const mockService = new WorkflowMockService();

  // Load data from the service when the component is mounted
  onMount(async () => {
    try {
      workflowSteps = mockService.getWorkflowSteps();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });
</script>

<div class="workflow-bar">
  {#each workflowSteps as { label, workflowState }, i}
    <div
      class="step-container {workflowState === 1
        ? 'success'
        : ''} {workflowState === 2 ? 'queried' : ''} {workflowState === 3
        ? 'in-progress'
        : ''}"
    >
      <div class="step">
        <span class="step__label">{label}</span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
    
.workflow-bar__container {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--eds-brand-color-border-base);
    background-color: var(--eds-brand-color-background-base);

    display: flex;
}

.workflow-bar {
    flex: 1 1 0;
    display: flex;
    flex-direction: row;

    > * + * {
        margin-left: calc(-1 * 0.4 * var(--bar-height));
    }
}

button {
    margin-left: 1rem;
    flex: 0 0 4rem;
    height: 2rem;
    margin-top: 1rem;
}

.step-container {
    --bar-height: 4rem;
    --bar-background-color: var(--eds-brand-color-background-secondary);
    --step-text-color: var(--eds-color-black);
    display: flex;
    flex: 1 1 0;
    height: var(--bar-height);

    &.success {
        --bar-background-color: var(--eds-brand-color-primary);
        --step-text-color: var(--eds-color-white);
    }

    &.queried {
        --bar-background-color: var(--eds-brand-color-yellow);
        --step-text-color: var(--eds-color-black);
    }

    &.in-progress {
        --bar-background-color: var(--eds-brand-color-accent);
        --step-text-color: var(--eds-color-white);
    }

    &:first-child > * {
        border-bottom-left-radius: var(--bar-height);
        border-top-left-radius: var(--bar-height);
    }

    &:last-child > * {
        border-bottom-right-radius: var(--bar-height);
        border-top-right-radius: var(--bar-height);
    }

    &:not(:first-child) {
        &::before {
            content: '';
            border: calc(var(--bar-height) / 2) solid var(--bar-background-color);
            border-left-color: transparent;
            border-right: 0px;
            display: block;
        }
    }

    &:not(:last-child) {
        &::after {
            content: '';
            border: calc(var(--bar-height) / 2) solid transparent;
            border-left-color: var(--bar-background-color);
            border-right: 0px;
            display: block;
        }
    }

    .step {
        background-color: var(--bar-background-color);
        flex: 1 1 0;
        display: flex;
        justify-content: center;
    }

    .step__label {
        color: var(--step-text-color);
        align-self: center;
        font-size: 18px;
    }
}

</style>
