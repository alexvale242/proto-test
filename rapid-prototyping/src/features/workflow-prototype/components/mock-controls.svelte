<script lang="ts">
    import workflowMockService from '../services/workflow-mock';
    function resetWorkflow() {
        workflowMockService.resetSteps();
    }
</script>

<section class="mock-controls__container">
    <button class="eds-button" on:click={resetWorkflow}>Reset</button>
</section>


<style lang="scss">
    .mock-controls__container {
        padding: 2rem;
    }
</style>
