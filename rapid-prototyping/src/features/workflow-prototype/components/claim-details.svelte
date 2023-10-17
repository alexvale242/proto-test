<script lang="ts">
    // your script goes here
</script>

<form class="eds-stack eds-form">
    <fieldset class="eds-fieldset">
        <legend class="eds-legend">
          <h2>
            Details
          </h2>
        </legend>
        <div class="eds-grid-form">
            <div>
                <eds-form-field label="Name" name="name">
                    <input class="eds-input" id="name" name="name" type="text" value="Q4 Example Claim">
                </eds-form-field>
                <eds-form-field label="Status" name="status">
                    <input class="eds-input" id="status" name="status" type="text" value="Open">
                </eds-form-field>
                <eds-form-field label="Value" name="value" readonly="true">
                    <input class="eds-input eds-read-only" id="value" name="value" type="text" value="£1000" readonly>
                </eds-form-field>
                <eds-form-field label="Partner" name="partner" readonly="true">
                    <input class="eds-input eds-read-only" id="partner" name="partner" type="text" value="Enable Electronics" readonly>
                </eds-form-field>
                <eds-form-field label="Agreement" name="agreement" readonly="true">
                    <input class="eds-input eds-read-only" id="agreement" name="agreement" type="text" value="2022 Example Agreement" readonly>
                </eds-form-field>
                <eds-form-field label="Start date" name="start-date" readonly="true">
                    <input class="eds-input eds-read-only" id="start-date" name="start-date" type="text" value="08/11/2022" readonly>
                </eds-form-field>
                <eds-form-field label="End date" name="end-date" readonly="true">
                    <input class="eds-input eds-read-only" id="end-date" name="end-date" type="text" value="12/11/2022" readonly>
                </eds-form-field>
            </div>
        </div>
    </fieldset>
</form>
<style lang="scss">
    /* your styles go here */
    fieldset {
        padding: 0 !important;
        margin: 0 !important;
    }
</style>
