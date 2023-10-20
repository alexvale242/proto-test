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
    @mixin format-scrollbar($direction: vertical, $show-only-on-hover: true) {
        /* stylelint-disable max-line-length */
        @if $show-only-on-hover == true {
            scrollbar-color: var(--eds-color-white, #fff)
                var(--eds-color-white, #fff);
        } @else {
            scrollbar-color: var(--eds-color-steel-50, #82999c)
                var(--eds-color-white, #fff);
        }
        /* stylelint-enable max-line-length */

        scrollbar-width: thin;

        &::-webkit-scrollbar {
            @if $direction == horizontal {
                width: auto;
                height: 10px;
            } @else if $direction == vertical {
                width: 10px;
            } @else if $direction == both {
                width: 10px;
                height: 10px;
            }
        }

        &::-webkit-scrollbar-track {
            background: var(--eds-color-white, #fff);
        }

        &::-webkit-scrollbar-thumb {
            border: 2px var(--eds-color-white, #fff) solid;
            border-radius: 5px;
            transition: border 0.5s, border-radius 0.5s;

            @if $show-only-on-hover == false {
                background-color: var(--eds-color-steel-50, #82999c);
            }
        }

        @if $show-only-on-hover == true {
            &:hover {
                scrollbar-color: var(--eds-color-steel-50, #82999c)
                    var(--eds-color-white, #fff);

                &::-webkit-scrollbar-thumb {
                    background-color: var(--eds-color-steel-50, #82999c);
                }
            }
        }
    }

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
        border: 1px solid var(--eds-brand-color-border-base);

        &:hover {
            background-color: var(--eds-brand-color-background-base);
        }
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

        overflow-y: auto;
        @include format-scrollbar();
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
