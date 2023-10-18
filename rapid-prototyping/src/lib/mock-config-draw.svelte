<script lang="ts">
    let drawOpen = false;

    function toggleDraw() {
        drawOpen = !drawOpen;
    }
</script>

<section class={drawOpen ? "open" : ""}>
    <button class="config-button" on:click="{toggleDraw}">{drawOpen ? "Close" : "Open"} config </button>
    <div class="config-draw">
        <slot></slot>
    </div>
</section>

<style lang="scss">
    :root{
        --draw-width: 500px;
    }
    .config-button {
        position: fixed;
        top: 50%;
        right: -32px;
        height: 2rem;
        transform:rotate(-90deg);
        transition: right 1s;
    }
    .config-draw {
        position: fixed;
        right: calc(-1 * var(--draw-width));
        top: 0;
        width: var(--draw-width);
        height: 100vh;
        border: 1px solid var(--eds-brand-color-border-base);
        background-color: var(--eds-brand-color-background-base);
        transition: right 1s;
    }

    .open {
        .config-button {
            right: calc(var(--draw-width) - 34px);
        }

        .config-draw {
            right: 0;
        }
    }
</style>
