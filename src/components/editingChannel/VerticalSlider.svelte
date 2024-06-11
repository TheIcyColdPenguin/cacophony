<script lang="ts">
    export let value: number;
    export let min = 0;
    export let max = 2;
    export let step = 0.01;
</script>

<input aria-orientation="vertical" type="range" bind:value {min} {max} {step} />

<style>
    input[aria-orientation="vertical"] {
        writing-mode: vertical-rl;
        direction: rtl;
    }
</style>
