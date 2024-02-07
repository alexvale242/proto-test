<script lang="ts">
    // your script goes here

    import AdjustmentAgreementMultiple from "./adjustment-agreement-multiple.svelte";
    import AdjustmentAgreementSingle from "./adjustment-agreement-single.svelte";
    let adjustmentComments = "";
    let isMultiple = true;


</script>

<div class="adjustment__container">
    <div class="toggle__container">
        <eds-form-field label="Multiple agreements" name="eds-toggle-switch--default" helptext="Prototype control: Not intended to be included in the finished product">
            <div class="eds-toggle-switch__input-container">
                <label tabindex="-1">
                    <input class="eds-toggle-switch__checkbox" bind:checked={isMultiple} type="checkbox" role="switch" tabindex="0" id="eds-toggle-switch--default" aria-describedby="eds-toggle-switch__description" aria-checked="false" aria-disabled="false">
                    <div class="eds-toggle-switch__slider" tabindex="-1"></div>
                    <span id="eds-toggle-switch__description" class="eds-toggle-switch__description-text" tabindex="-1" aria-hidden="false" title="off" style="display: block;">off</span>
                </label>
            </div>
        </eds-form-field>
    </div>


    {#if isMultiple}
        <AdjustmentAgreementMultiple></AdjustmentAgreementMultiple>
    {:else}
        <AdjustmentAgreementSingle></AdjustmentAgreementSingle>
    {/if}

    <eds-form-field label="Comment" name="comment" class="comment-input">
        <textarea
            class="eds-input"
            id="comment"
            name="comment"
            bind:value={adjustmentComments}
        />
    </eds-form-field>
    <button class="eds-button eds-button--prominent">Adjust claim</button>
</div>

<style lang="scss">
    .comment-input {
        margin-top: 1rem;
    }

    .eds-button {
        margin-top: 1.5rem;
    }
    .adjustment__container {
        margin-top: 0.5rem;
        position: relative;
    }

    .toggle__container {
        position: absolute;
        right: 3rem;
        top: -0.5rem;
        width: 175px;
    }
</style>
