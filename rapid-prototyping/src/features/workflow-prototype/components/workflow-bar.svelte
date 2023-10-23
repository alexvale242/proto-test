<script lang="ts">
    import { onMount } from "svelte";
    import workflowMockService from "../services/workflow-mock";
    import type { WorkflowStep } from "../../../lib/workflow-engine/models/workflow-step.model";
    import { WorkflowState } from "../../../lib/workflow-engine/models/workflow-state.model";
    import WorkflowBarDetails from "./workflow-bar-details.svelte";

    let workflowSteps: WorkflowStep[] = [];

    let detailsVisible = false;
    let leftness = 0;

    // Load data from the service when the component is mounted
    onMount(async () => {
        try {
            workflowMockService.workflowState.subscribe(($state) => {
                workflowSteps = $state.steps;
            });
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });

    function toggleDetails(index: number) {
        detailsVisible = !detailsVisible;

        if (detailsVisible) {
            const numberOfSteps = workflowSteps.length;

            const workflowBarWidth = (document.getElementsByClassName("workflow-bar")[0] as any).offsetWidth;
            leftness = index / numberOfSteps * workflowBarWidth;

            if (leftness === 0) {
                leftness = 32;
            }
        };
    }
</script>

<div class="workflow-bar">
    {#each workflowSteps as { label, workflowState }, i}
        <div
            on:click={() => toggleDetails(i)}
            class="step-container {workflowState === WorkflowState.complete
                ? 'success'
                : ''} {workflowState === WorkflowState.queried
                ? 'queried'
                : ''} {workflowState === WorkflowState.inprogress
                ? 'in-progress'
                : ''}"
        >
            <div class="step">
                <span class="step__label">{label}</span>
            </div>
        </div>
    {/each}
</div>
{#if detailsVisible}
    <div class="workflow-details" style="left: {leftness}px">
        <WorkflowBarDetails />
    </div>
{/if}

<style lang="scss">
    .workflow-details {
        position: absolute;
        bottom: 6rem;
        z-index: 500;
        background-color: white;

        &::after {
            content: "";
            position: absolute;
            border-left: 2rem solid transparent;
            border-right: 2rem solid transparent;
            border-top: 2rem solid var(--eds-brand-color-background-base);
            left: 1rem;
            filter: drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.15));
        }
    }

    .workflow-bar {
        flex: 1 1 0;
        display: flex;
        flex-direction: row;

        > * + * {
            margin-left: calc(-1 * 0.4 * var(--bar-height));
        }
    }

    .step-container {
        --bar-height: 3rem;
        --bar-background-color: var(--eds-brand-color-background-secondary);
        --step-text-color: var(--eds-color-black);
        display: flex;
        flex: 1 1 0;
        height: var(--bar-height);
        cursor: pointer;

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
                content: "";
                border: calc(var(--bar-height) / 2) solid
                    var(--bar-background-color);
                border-left-color: transparent;
                border-right: 0px;
                display: block;
            }
        }

        &:not(:last-child) {
            &::after {
                content: "";
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
