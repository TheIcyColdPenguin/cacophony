<script lang="ts">
    import { onMount } from "svelte";
    import { clicks } from "../stores/clicks";
    import { DataFlowGraph, type OscillatorGraphNode } from "../types/dataFlowGraph";
    import ContextMenu from "./ContextMenu.svelte";
    import GraphNode from "./editingChannel/GraphNode.svelte";

    const clickKey = Symbol("EditAreaClick");

    let dataFlowGraph: DataFlowGraph;
    let playArea: HTMLDivElement;

    let playAreaBounds: DOMRect;

    onMount(() => {
        dataFlowGraph = new DataFlowGraph(playArea.clientWidth, playArea.clientHeight);
        playAreaBounds = playArea?.getBoundingClientRect();
    });

    function rightclick(e: MouseEvent) {
        $clicks = { [clickKey]: { x: e.clientX, y: e.clientY, primary: false } };
    }
</script>

<div
    bind:this={playArea}
    on:contextmenu|preventDefault|stopPropagation={rightclick}
    role="main"
    class="main-box col-span-11 h-full bg-slate-800"
>
    {#if dataFlowGraph}
        {#each dataFlowGraph.elems.entries() as [nodeIndex, node] (nodeIndex)}
            <GraphNode bounds={playAreaBounds} bind:node />
        {/each}
    {/if}
</div>

<ContextMenu key={clickKey} let:hide={hideContextMenu}>
    <button
        on:click={(e) => {
            dataFlowGraph = dataFlowGraph.createNode("osc", e.clientX, e.clientY);
            hideContextMenu();
        }}
    >
        Add Oscillator Node
    </button>
    <button
        on:click={(e) => {
            dataFlowGraph = dataFlowGraph.createNode("gain", e.clientX, e.clientY);
            hideContextMenu();
        }}
    >
        Add Gain Node
    </button>
</ContextMenu>

<svelte:window
    on:resize={() => {
        playAreaBounds = playArea?.getBoundingClientRect();
    }}
/>
