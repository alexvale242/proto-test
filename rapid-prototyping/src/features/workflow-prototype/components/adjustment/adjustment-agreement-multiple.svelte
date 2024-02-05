<script lang="ts">
    import AgreementTile from './agreement.svelte';

    let agreementValue1 = 1000;
    let agreementValue2 = 1000;
    let agreementValue3 = 1000;
    let agreementValue4 = 1000;

    let startValue = 4000;

    $: AgreementValues = agreementValue1 + agreementValue2 + agreementValue3 + agreementValue4;
    $: AdjustmentValue = AgreementValues - startValue;
</script>

<style lang="scss">
    .agreement__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
        margin-top: 1rem;
        width: 65svw;
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

    .values {
        display: flex;
        align-items: center;

        .adjustment-value {
            margin-left: 2rem;
        }
    }
</style>

<div class="values">
    <div class="value">
        <span class="value-title">Value to claim (CUR)</span>
        <span class="value-text">{AgreementValues}</span>
    </div>
    <div class="value adjustment-value">
        <span class="value-title">Adjustment value (CUR)</span>
        <span class="value-text">{AdjustmentValue}</span>
    </div>

</div>

<div class="agreement__container">
    <AgreementTile on:adjustmentValueChanged={(event) => agreementValue1 = event.detail}></AgreementTile>
    <AgreementTile on:adjustmentValueChanged={(event) => agreementValue2 = event.detail}></AgreementTile>
    <AgreementTile on:adjustmentValueChanged={(event) => agreementValue3 = event.detail}></AgreementTile>
    <AgreementTile on:adjustmentValueChanged={(event) => agreementValue4 = event.detail}></AgreementTile>
</div>
