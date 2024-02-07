<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    let adjustValue = "";
    let startValue = 1000;

    const dispatch = createEventDispatcher();

    $: netValue = startValue + adjustValue;
    $: dispatch('adjustmentValueChanged', netValue);
</script>

<div class="agreement-tile">
    <div class="value__container">
        <span class="value">£{netValue}</span>
    </div>
    <div class="eds-tag eds-tag--success">
        Program line
    </div>

    <div class="agreement-name">Test Agreement</div>
    <div class="adjust_container">
        <eds-form-field label="Adjustment value" name="claim-value">
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

<style lang="scss">
    .agreement-tile {
        border: 1px solid var(--eds-brand-color-border-base);
        padding: 1rem;
        background-color: var(--eds-brand-color-background-secondary);
        border-radius: 0.5rem;
    }

    .value__container {

        .value {
            font-size: 2.5rem;
            font-weight: 300;
        }
    }

    .eds-tag {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }

    .adjust_container {
        margin-top: 0.5rem;
    }

    .agreement-name {
        font-size: 1.25rem;;
    }
</style>
