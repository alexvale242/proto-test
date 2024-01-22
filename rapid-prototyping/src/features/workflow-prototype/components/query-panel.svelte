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

    function resetWorkflow(comment: string) {
        workflowMockService.resolveQuery();
        addComment(comment);
        resetForms();
        modalOpen = false;
    }

    function adjustClaim() {
        if (!!adjustValue) {
            const currentClaimValue = claimValueService.getCurrentClaimValue();
            claimValueService.writeClaimValue(adjustValue);

            const adjustMessage = `Claim value adjusted from ${currentClaimValue} CUR to ${adjustValue} CUR. The following comment was made: ${adjustComments}`;
            resetWorkflow(adjustMessage);
        }
    }

    function resetForms() {
        adjustValue = 0;
        resetComments = "";
        adjustComments = "";
        archiveComments = "";
    }

    function addComment(comment: string) {
        const newComment = claimActivityMockService.createQueryResolution(
                "Query Resolver",
                comment,
            );

            claimActivityMockService.addComment(newComment);
    }

    let queryRaisedBy: string | undefined = "";
    let queryMessage: string | undefined = "";

    export let modalOpen = false;
    let adjustValue = 0;
    let resetComments = "";
    let adjustComments = "";
    let archiveComments = "";

    $: canSubmitAdjustment = adjustComments.trim() !== "" && !!adjustValue;
    $: canSubmitArchive = archiveComments.trim() !== "";
    $: canSubmitReset = resetComments.trim() !== "";
</script>

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
                A query has been raised by {queryRaisedBy}. How do you wish to resolve this query?
            </p>
            <eds-info-message
            class="query-message"
            status="warning"
            display="block"
            message="{queryMessage}"
            size="fill"
        />
            <div class="query-actions">
                <eds-accordion
                    id="eds-accordion-reset"
                    headingsize="medium"
                    open="false"
                    disabled="false"
                >
                    <div slot="header">
                        <span>Reset workflow</span>
                    </div>
                    <div slot="content">
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
                            disabled={!canSubmitReset}
                            class="eds-button eds-button--prominent adjust-claim"
                            on:click={() => resetWorkflow(`Workflow has been reset. The following comment was made: ${resetComments}`)}>Reset workflow</button
                        >
                    </div>
                </eds-accordion>
                <eds-accordion
                    id="eds-accordion-adjust"
                    headingsize="medium"
                    open="false"
                    disabled="false"
                >
                    <div slot="header">
                        <span>Adjust claim</span>
                    </div>
                    <div slot="content">
                        <form class="adjust-form">
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
                            <eds-form-field label="Comment" name="comment">
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
                <eds-accordion
                    id="eds-accordion-archive"
                    headingsize="medium"
                    open="false"
                    disabled="false"
                >
                    <div slot="header">
                        <span>Archive claim</span>
                    </div>
                    <div slot="content">
                        <form class="adjust-form">
                            <eds-form-field label="Comment" name="comment">
                                <textarea
                                    class="eds-input"
                                    id="comment"
                                    name="comment"
                                    bind:value={archiveComments}
                                />
                            </eds-form-field>
                        </form>
                        <button
                            disabled={!canSubmitArchive}
                            class="eds-button eds-button--prominent adjust-claim"
                            >Archive claim</button
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

        :not(:first-child) {
            margin-top: 1rem;
        }
    }

    .adjust-claim {
        width: 100%;
        margin-top: 2rem !important;
    }

    p {
        margin: 2rem 0;
    }

    button {
        max-width: 300px;
    }
</style>
