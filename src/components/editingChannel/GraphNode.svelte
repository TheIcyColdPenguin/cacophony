<script lang="ts">
    import { onMount } from "svelte";
    import type { DataFlowGraphNode } from "../../types/dataFlowGraph";
    import OscillatorNode from "./OscillatorNode.svelte";
    import VerticalSlider from "./VerticalSlider.svelte";

    export let node: DataFlowGraphNode;
    export let bounds: DOMRect | undefined;

    let nodeBox: HTMLDivElement;
    let movedAmount: { x: number; y: number } | undefined;
    let mousePressPos: { x: number; y: number } | undefined;

    onMount(() => {
        node.height = nodeBox.clientHeight;
    });
</script>

<div
    bind:this={nodeBox}
    class="node aspect-square absolute bg-slate-700 p-1 rounded-sm"
    style={`width:${node.width}px; top: ${node.y + (movedAmount?.y || 0)}px; left: ${node.x + (movedAmount?.x || 0)}px`}
>
    <button
        class="text-center bg-slate-700 hover:bg-slate-600 duration-200 transition-colors w-11/12 grid place-items-center text-xl rounded-l"
        class:cursor-grabbing={mousePressPos}
        class:cursor-grab={!mousePressPos}
        on:mousedown={(e) => {
            mousePressPos = { x: e.clientX, y: e.clientY };
            movedAmount = { x: 0, y: 0 };
        }}>⠿</button
    >
    <div>
        {#if node.type == "output"}
            Audio out
        {:else if node.type == "gain"}
            <div>
                {node.gain}
            </div>
            <VerticalSlider bind:value={node.gain} />
        {:else if node.type == "osc"}
            <OscillatorNode bind:node />
        {/if}
    </div>
</div>

<svelte:window
    on:mousemove={(e) => {
        if (!(mousePressPos && movedAmount)) {
            return;
        }
        if (!bounds) {
            return;
        }

        const newMovedAmount = {
            x: e.clientX - mousePressPos.x,
            y: e.clientY - mousePressPos.y,
        };
        const newPos = {
            x: node.x + newMovedAmount.x,
            y: node.y + newMovedAmount.y,
        };

        if (bounds) {
            if (newPos.x <= bounds.left) {
                movedAmount.x = bounds.left - node.x;
            } else if (newPos.x + node.width >= bounds.right) {
                movedAmount.x = bounds.right - node.x - node.width;
            } else {
                movedAmount.x = newMovedAmount.x;
            }
            if (newPos.y <= bounds.top) {
                movedAmount.y = bounds.top - node.y;
            } else if (newPos.y + node.height >= bounds.bottom) {
                movedAmount.y = bounds.bottom - node.y - node.height;
            } else {
                movedAmount.y = newMovedAmount.y;
            }
        }
    }}
    on:mouseup={() => {
        if (!(movedAmount && mousePressPos)) {
            return;
        }
        node.x += movedAmount.x;
        node.y += movedAmount.y;
        movedAmount = undefined;
        mousePressPos = undefined;
    }}
/>

<style>
    div.node {
        display: grid;
        grid-template-rows: 1fr 10fr;
        place-items: center;
        gap: 1rem;
    }
    input[aria-orientation="vertical"] {
        writing-mode: vertical-rl;
        direction: rtl;
    }
</style>
