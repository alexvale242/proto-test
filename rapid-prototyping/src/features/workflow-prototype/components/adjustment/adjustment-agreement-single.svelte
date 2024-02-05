<script lang="ts">
    let adjustValue = "";
    let initialValue = 1000;

    $: valueToClaim = initialValue + adjustValue;
</script>

<style lang="scss">
    .agreement__container {
    }

    .value {
        display: flex;
        flex-direction: column;
    }

    .value-title {
        color: var(--eds-color-steel-60)
    }

    .value-text {
        margin-top: 0.5rem;
        font-size: 1.5rem;;
        margin-bottom: 0.5rem;
    }
</style>

<div class="agreement__container">
    <div>
        <div class="value">
            <span class="value-title">Value to claim (CUR)</span>
            <span class="value-text">{valueToClaim}</span>
        </div>
        <eds-form-field
        label="Adjustment value"
        name="claim-value"
    >
        <input
            class="eds-input"
            id="adjust-target"
            name="claim-value"
            type="number"
            bind:value={adjustValue}
        />
    </eds-form-field>
    </div>

</div>
