<script lang="ts">
    import workflowMockService from "../services/workflow-mock";
    import claimValueService from "../services/claim-value.service";
    import { onMount } from "svelte";
    import claimActivityMockService from "../services/claim-activity-mock";

    onMount(async () => {
        try {
            workflowMockService.workflowState.subscribe((workflow) => {
                queryRaisedBy = workflow.queryRaisedBy;
                queryMessage = workflow.queryMessage;
            });
        } catch (error) {
            console.error("Error loading data:", error);
        }
    });

    function stopWorkflow(comment: string) {
        workflowMockService.restartWorkflow();
        addComment(comment);
        resetForms();
        modalOpen = false;
    }

    function continueWorkflow(comment: string) {
        workflowMockService.continueWorkflow();
        addComment(comment);
        resetForms();
        modalOpen = false;
    }

    function adjustClaim() {
        if (!!adjustValue) {
            const currentClaimValue = claimValueService.getCurrentClaimValue();
            claimValueService.writeClaimValue(adjustValue);

            const adjustMessage = `Claim value adjusted from ${currentClaimValue} CUR to ${adjustValue} CUR. The following comment was made: ${adjustComments}`;
            stopWorkflow(adjustMessage);
        }
    }

    function resetForms() {
        adjustValue = 0;
        resetComments = "";
        adjustComments = "";
        continueComments = "";
    }

    function addComment(comment: string) {
        const newComment = claimActivityMockService.createQueryResolution(
            "Query Resolver",
            comment,
        );

        claimActivityMockService.addComment(newComment);
    }

    function closePanel() {
        modalOpen = false;
    }

    function openAccordion(panelNumber: number) {
        console.log(panelNumber);
        panelNumberOpen = panelNumber;
    }

    let queryRaisedBy: string | undefined = "";
    let queryMessage: string | undefined = "";

    export let modalOpen = false;
    let adjustValue = 0;
    let resetComments = "";
    let adjustComments = "";
    let continueComments = "";

    $: canSubmitAdjustment = adjustComments.trim() !== "" && !!adjustValue;
    $: canSubmitContinue = continueComments.trim() !== "";
    $: canSubmitStop = resetComments.trim() !== "";

    $: panelNumberOpen = -1;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<eds-modal
    id="query-modal"
    open={modalOpen}
    size="fitcontent"
    usecontrolregion="false"
    controlregionstyle="unstyled"
    disableclickoutside="true"
>
    <div slot="body">
        <div>
            <h2>Resolve query</h2>
            <p>
                A query has been raised by {queryRaisedBy}, this query must be
                resolved before workflow can continue. How do you wish to
                resolve this query?
            </p>
            <button class="close-panel" on:click={closePanel}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#2D3839"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2D3839"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <eds-info-message
                class="query-message"
                status="warning"
                display="block"
                message={queryMessage}
                size="fill"
            />
            <div class="query-actions">
                <eds-accordion
                    id="eds-accordion-archive"
                    headingsize="medium"
                    open={panelNumberOpen === 0}
                    disabled="false"
                    on:click={() => openAccordion(0)}
                >
                    <div slot="header">
                        <span>Continue workflow</span>
                    </div>
                    <div slot="content">
                        <p>
                            Resolve the query and continue workflow from where
                            it's current state.
                        </p>
                        <form class="adjust-form">
                            <eds-form-field label="Comment" name="comment">
                                <textarea
                                    class="eds-input"
                                    id="comment"
                                    name="comment"
                                    bind:value={continueComments}
                                />
                            </eds-form-field>
                        </form>
                        <button
                            disabled={!canSubmitContinue}
                            class="eds-button eds-button--prominent adjust-claim"
                            on:click={() =>
                                continueWorkflow(
                                    `Workflow has been continued. The following comment was made: ${continueComments}`,
                                )}>Continue workflow</button
                        >
                    </div>
                </eds-accordion>
                <eds-accordion
                    id="eds-accordion-reset"
                    headingsize="medium"
                    open={panelNumberOpen === 1}
                    disabled="false"
                    on:click={() => openAccordion(1)}
                >
                    <div slot="header">
                        <span>Stop workflow</span>
                    </div>
                    <div slot="content">
                        <p>
                            Resolve the query and send the claim back to the
                            Commercial team for re-approval.
                        </p>
                        <form class="adjust-form">
                            <eds-form-field label="Comment" name="comment">
                                <textarea
                                    class="eds-input"
                                    id="comment"
                                    name="comment"
                                    bind:value={resetComments}
                                />
                            </eds-form-field>
                        </form>
                        <button
                            disabled={!canSubmitStop}
                            class="eds-button eds-button--prominent adjust-claim"
                            on:click={() =>
                                stopWorkflow(
                                    `Workflow has been reset. The following comment was made: ${resetComments}`,
                                )}>Reset workflow</button
                        >
                    </div>
                </eds-accordion>
                <eds-accordion
                    id="eds-accordion-adjust"
                    headingsize="medium"
                    open={panelNumberOpen === 2}
                    disabled="false"
                    on:click={() => openAccordion(2)}
                >
                    <div slot="header">
                        <span>Adjust claim</span>
                    </div>
                    <div slot="content">
                        <form class="adjust-form">
                            <p>
                                Adjust the value of the Claim and send the claim
                                back to the Commercial team for re-approval
                            </p>
                            <eds-form-field
                                label="Claim value (CUR)"
                                name="claim-value"
                            >
                                <input
                                    class="eds-input"
                                    id="claim-value"
                                    name="claim-value"
                                    type="number"
                                    bind:value={adjustValue}
                                />
                            </eds-form-field>
                            <eds-form-field label="Comment" name="comment" class="comment-input">
                                <textarea
                                    class="eds-input"
                                    id="comment"
                                    name="comment"
                                    bind:value={adjustComments}
                                />
                            </eds-form-field>
                        </form>
                        <button
                            disabled={!canSubmitAdjustment}
                            class="eds-button eds-button--prominent adjust-claim"
                            on:click={adjustClaim}>Adjust claim</button
                        >
                    </div>
                </eds-accordion>
            </div>
        </div>
    </div>
</eds-modal>

<style lang="scss">
    .query-actions {
        margin-top: 2rem;

        eds-accordion {
            display: block;
            margin-bottom: 1rem;
        }
    }

    .adjust-claim {
        width: 100%;
        margin-top: 2rem !important;
    }

    p {
        margin: 1rem 0;
    }

    button {
        max-width: 300px;
    }

    .close-panel {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 2rem;
        height: 2rem;
        background: none;
    }
    .comment-input {
        margin-top: 1rem;
    }
</style>
