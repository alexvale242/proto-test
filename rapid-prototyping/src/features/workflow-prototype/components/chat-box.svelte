<script lang="ts">
    import { onMount } from "svelte";
    import claimActivityMockService from "../services/claim-activity-mock";
    import workflowMock from "../services/workflow-mock";
    import workflowMockService from "../services/workflow-mock";
    import { WorkflowState } from "../../../lib/workflow-engine/models/workflow-state.model";

    export let queryModeEnabled = false;
    let workflowComplete = false;

    function addComment(): void {
        const commentValue: string = (
            document.getElementById("comment-input") as any
        ).value;
        if (!!commentValue) {
            const newComment = claimActivityMockService.createComment(
                "John Bobson",
                commentValue,
                queryModeEnabled
            );

            claimActivityMockService.addComment(newComment);

            if (queryModeEnabled) {
                workflowMock.query(commentValue, "John Bobson");
                queryModeEnabled = false;
            }

            (document.getElementById("comment-input") as any).value = "";
        }
    }

    onMount(async () => {
        try {
            workflowMockService.workflowState.subscribe((workflow) => {
                const workflowState =
                    workflowMockService.getWorkflowStatus(workflow);
                workflowComplete = workflowState === WorkflowState.complete;
                if (workflowComplete) {
                    queryModeEnabled = false;
                }
            });
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });
</script>

<section class="chat-container {queryModeEnabled ? 'query-mode' : ''}">
    {#if queryModeEnabled}
        <div class="query-warning-container">
            <eds-info-message
                status="warning"
                display="inline"
                message="Raising a query will stop workflow"
            />
        </div>
    {/if}
    <textarea
        class="chat-input"
        id="comment-input"
        placeholder="Type your comment here"
    />
    <div class="chat-controls">
        <button class="submit-button" on:click={addComment}>
            <svg
                class="stroke-black hover:stroke-brand-primary"
                width="90px"
                height="90px"
                viewBox="0 0 30 90"
                version="1.1"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
                ><path
                    d="M5.51,53.142l18.99,-8.142l-18.99,-8.142l0.567,6.237l18.418,1.907l-18.418,1.903l-0.567,6.237Z"
                    style="fill-rule:nonzero;stroke:var(--eds-color-black, #000000);stroke-width:1.25px;"
                /></svg
            >
        </button>
    </div>
</section>

<style lang="scss">
    .chat-container {
        width: 100%;
        height: 100%;
        display: flex;
        border: 1px solid var(--eds-brand-color-border-base);
        flex-wrap: wrap;
    }

    .chat-input {
        outline: none;
        flex: 1 1 0;
        padding: 0.75rem;
        resize: none;
    }

    .chat-controls {
        flex: 0 0 3rem;
    }

    .submit-button {
        display: flex;
        background: none;
        width: 3rem;
        height: 3rem;
        align-items: center;
        cursor: pointer;
    }

    .query-button {
        display: flex;
        background: none;
        width: 3rem;
        height: 3rem;
        align-items: center;
        cursor: pointer;

        .query-icon {
            margin-top: 4rem;
            margin-left: 0.25rem;
        }
    }

    .query-warning-container {
        position: absolute;
        padding: 0.75rem;
    }

    .query-mode {
        &.chat-container {
            border-color: var(--eds-brand-color-status-warning);
        }
        .chat-input {
            margin-top: 2rem;
        }
    }
</style>
