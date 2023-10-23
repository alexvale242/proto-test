<script lang="ts">
    import { WorkflowState } from "../../../lib/workflow-engine/models/workflow-state.model";
    import type { WorkflowStep } from "../../../lib/workflow-engine/models/workflow-step.model";
    import workflowMockService from "../services/workflow-mock";

    let workflowSteps: WorkflowStep[] = [
        {
            label: "Commercial",
            workflowState: WorkflowState.inprogress,
        },
        {
            label: "Finance",
            workflowState: WorkflowState.notStarted,
        },
        {
            label: "Accounts Receivable",
            workflowState: WorkflowState.notStarted,
        },
    ];

    function addStep(): void {
        const newStep: WorkflowStep = {
            label: "New workflow step",
            workflowState: workflowSteps.length === 0 ? WorkflowState.inprogress : WorkflowState.notStarted,
        };

        const newSteps = [...workflowSteps];

        newSteps.push(newStep);

        workflowSteps = newSteps;
    }

    function removeStep(index: number): void {
        const newSteps = [...workflowSteps];

        newSteps.splice(index, 1);

        workflowSteps = newSteps;
    }

    function saveSteps(): void {
        workflowMockService.setWorkflowSteps(workflowSteps);
    }
</script>

<section class="workflow-config__page">
    <section class="workflow-config__summary">
        <div class="step__summary">
            {#each workflowSteps as step, i}
                <div class="workflow-step__card">
                    {i + 1}. {step.label}
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                </div>
            {/each}
        </div>
        <div class="action-container">
            <button class="eds-button" on:click={addStep}>Add step</button>
            <button
                class="eds-button eds-button--prominent"
                on:click={saveSteps}>Save workflow</button
            >
        </div>
    </section>
    <section class="workflow-config__container">
        <h2>Workflow details</h2>
        <div class="config__summary">
            <div class="config__controls">
                <eds-form-field label="Workflow name" name="name">
                    <input
                        class="eds-input"
                        id="name"
                        name="name"
                        type="text"
                        value="New workflow"
                    />
                </eds-form-field>

                <eds-form-field label="Other things" name="name">
                    <input
                        class="eds-input"
                        id="name"
                        name="name"
                        type="text"
                        value="Things"
                    />
                </eds-form-field>
                <eds-form-field label="Other things" name="name">
                    <input
                        class="eds-input"
                        id="name"
                        name="name"
                        type="text"
                        value="Stuff"
                    />
                </eds-form-field>
                <eds-form-field label="Active" name="active">
                    <eds-toggle-switch
                        id="eds-toggle-switch__default"
                        name="eds-toggle-switch--default"
                        descriptionon="on"
                        descriptionoff="off"
                        checked="false"
                        disabled="false"
                    />
                </eds-form-field>
            </div>
        </div>
        <h2>Workflow steps</h2>
        <div class="config__workflow-steps">
            {#each workflowSteps as step, i}
                <div class="workflow-step-form__container">
                    <button class="remove-step" on:click={() => removeStep(i)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                    <h3>{step.label}</h3>
                    <div class="config__controls">
                        <eds-form-field label="Label" name="label">
                            <input
                                class="eds-input"
                                id="label"
                                name="label"
                                type="text"
                                bind:value={step.label}
                            />
                        </eds-form-field>
                        <eds-form-field label="Select group" name="group">
                            <input
                                class="eds-input"
                                id="group"
                                name="group"
                                type="text"
                                value=""
                            />
                        </eds-form-field>
                        <eds-form-field label="Value threshold (CUR)" name="value">
                            <input
                                class="eds-input"
                                id="value"
                                name="value"
                                type="text"
                                value=""
                            />
                        </eds-form-field>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</section>

<style lang="scss">
    .workflow-config__page {
        display: grid;
        grid-template-columns: minmax(400px, 1fr) 4fr;
        grid-gap: 2rem;
        padding: 2rem;
        padding-top: 6rem;
    }

    .workflow-config__summary {
        padding: 1rem;
        border-radius: 4px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .step__summary {
            width: 100%;
            border: 1px solid var(--eds-brand-color-border-base);
            padding: 2rem;
        }

        .workflow-step__card {
            border: 1px solid var(--eds-brand-color-border-base);
            background-color: var(--eds-brand-color-background-base);
            padding: 1rem;
            padding-right: 2rem;
            margin-top: 0.5rem;
            border-radius: 4px;
            width: 100%;

            svg {
                width: 1rem;
                height: 1rem;
                float: right;
            }
        }

        button {
            margin-top: 1rem;
        }
    }

    .workflow-config__container {
        padding: 1rem;
        margin-right: 2rem;
    }

    .remove-step {
        background: none;
        width: 2rem;
        height: 2rem;
        float: right;
    }

    .workflow-step-form__container {
        border: 1px solid var(--eds-brand-color-border-base);
        padding: 1rem;
        flex: 0 0 18rem;

        &:not(:first-child) {
            margin-top: 2rem;
        }

    }

    .action-container {
        display: flex;
        justify-content: space-between;

        button {
            &:not(:first-child) {
                margin-left: 1rem;
            }
        }
    }

    .config__summary {
        margin-bottom: 2rem;

        width: 100%;
        border: 1px solid var(--eds-brand-color-border-base);
        padding: 1rem;
    }

    .config__controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
    }
</style>
