<script lang="ts">
    import workflowMockService from "../services/workflow-mock";
    import claimValueService from '../services/claim-value.service';

    function resetWorkflow() {
        workflowMockService.resolveQuery();
        modalOpen = false;
    }

    function openAdjustClaimMode() {
        adjustClaimMode = true;
    }

    function adjustClaim() {
        const valueInput = document.getElementById("claim-value") as HTMLInputElement;
        const claimValue = valueInput?.value;

        if (!!claimValue) {
            var valueNum = parseFloat(claimValue);
            claimValueService.writeClaimValue(valueNum);

            resetWorkflow();
        }
    }

    export let modalOpen = false;
    let adjustClaimMode = false;
    let adjustValue = 0;
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
        {#if adjustClaimMode}
            <div>
                <h2>Adjust Claim</h2>
                <p>Please adjust the claim value.</p>
                <form class="adjust-form">
                    <eds-form-field label="Claim value (CUR)" name="claim-value">
                        <input class="eds-input" id="claim-value" name="claim-value" type="text" value="{adjustValue}">
                    </eds-form-field>
                </form>
                <button
                class="eds-button eds-button--prominent adjust-claim"
                on:click={adjustClaim}>Adjust claim</button>
            </div>
        {:else}
            <div>
                <h2>Resolve query</h2>
                <p>How do you wish to resolve the query?</p>
                <div class="query-actions">
                    <button
                        class="eds-button eds-button--prominent"
                        on:click={resetWorkflow}>Reset workflow</button
                    >
                    <button class="eds-button" on:click={openAdjustClaimMode}>Adjust claim</button>
                    <button class="eds-button">Delete claim</button>
                </div>
            </div>
        {/if}
    </div>
</eds-modal>

<style lang="scss">
    .query-actions {
        display: flex;
        flex-direction: column;

        button {
            display: block;
            margin-top: 1rem;
        }
    }

    .adjust-form {
        margin-top: 1rem;
    }

    .adjust-claim {
        width: 100%;
        margin-top: 2rem;
    }
</style>
