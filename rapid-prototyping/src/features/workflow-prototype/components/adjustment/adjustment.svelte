<script lang="ts">
    // your script goes here

    import AdjustmentAgreementMultiple from "./adjustment-agreement-multiple.svelte";
    import AdjustmentAgreementSingle from "./adjustment-agreement-single.svelte";
    let adjustmentComments = "";
    let isMultiple = true;


</script>

<div class="adjustment__container">
        <AdjustmentAgreementMultiple></AdjustmentAgreementMultiple>
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
