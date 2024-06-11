<script lang="ts">
    import { Shape } from "../../synth/constants/shapes";
    import type { OscillatorGraphNode } from "../../types/dataFlowGraph";

    export let node: OscillatorGraphNode;

    const shapeMap = {
        [Shape.Sine]: "∿",
        [Shape.Square]: "⎍",
        [Shape.Triangle]: "W",
        [Shape.Sawtooth]: "⩘",
    };
</script>

<div class="node-details">
    <select class="bg-slate-700 text-teal-200 text-4xl" bind:value={node.shape}>
        {#each Object.values(Shape) as shape}
            <option value={shape}>{shapeMap[shape]}</option>
        {/each}
    </select>
</div>

<style>
    div.node-details {
        display: grid;
    }
</style>
