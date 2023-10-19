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
        --draw-width: 100svw;
    }
    .config-button {
        position: fixed;
        top: 0;
        right: 0;
        height: 2rem;
        transition: right 0.3s;
        z-index: 300;
    }
    .config-draw {
        position: fixed;
        right: calc(-1 * var(--draw-width));
        top: 0;
        width: var(--draw-width);
        height: 100vh;
        border: 1px solid var(--eds-brand-color-border-base);
        background-color: var(--eds-brand-color-background-base);
        transition: right 0.3s;
    }

    .open {
        .config-button {
            right: 0;
        }

        .config-draw {
            right: 0;
        }
    }
</style>
