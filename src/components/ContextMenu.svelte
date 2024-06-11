<script lang="ts">
    import { fade } from "svelte/transition";
    import { clicks } from "../stores/clicks";

    export let key: symbol;

    $: showMenu = $clicks[key];

    function hide() {
        $clicks = {};
    }
</script>

{#if showMenu}
    <div
        on:click|stopPropagation
        on:contextmenu|stopPropagation
        on:keydown={(e) => {
            if (e.key == "Escape") {
                hide();
            }
        }}
        role="menu"
        tabindex="-1"
        transition:fade={{ duration: 100 }}
        style={`left: ${$clicks[key]?.x}px; top:${$clicks[key]?.y}px`}
        class="fixed rounded p-1 bg-slate-700 backdrop-blur z-10"
    >
        <slot {hide} />
    </div>
{/if}

<svelte:window
    on:click={hide}
    on:keydown={(e) => {
        if (e.key == "Escape") {
            hide();
        }
    }}
/>

<style>
    div {
        user-select: none;
        box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.103);
    }

    div :global(hr) {
        margin-block: 0.25rem;
        opacity: 0.5;
    }

    div :global(button) {
        display: block;
        text-align: left;
        width: 100%;
        margin-block: 0.0625rem;
        padding-block: 0.25rem;
        padding-inline: 0.25rem;
        border-radius: 0.2rem;
        background-color: rgba(255 255 255 / 0);
        transition: all ease-in-out 0.125s;
    }

    div :global(button):hover {
        background-color: rgba(255 255 255 / 0.1);
    }
</style>
