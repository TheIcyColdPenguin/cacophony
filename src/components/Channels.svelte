<script lang="ts">
    import { channels } from "../stores/channels";
    import { clicks } from "../stores/clicks";
    import { context } from "../stores/context";
    import { mainAreaMode } from "../stores/mainAreaMode";
    import type { Channel } from "../types/channels";
    import { MainAreaMode } from "../types/mainareamodes";
    import ContextMenu from "./ContextMenu.svelte";

    const emptyAreaClick = Symbol("EmptyAreaClick");
    const channelAreaClick = Symbol("channelAreaClick");

    let rightClickedChannel: Channel;

    function rightclick(e: MouseEvent) {
        $clicks = { [emptyAreaClick]: { x: e.clientX, y: e.clientY, primary: false } };
    }
    function rightclickChannel(e: MouseEvent, channel: Channel) {
        rightClickedChannel = channel;
        $clicks = { [channelAreaClick]: { x: e.clientX, y: e.clientY, primary: false } };
    }
</script>

<div
    class="h-full bg-slate-900 flex flex-col p-2 gap-3"
    on:contextmenu|preventDefault|stopPropagation={rightclick}
    role="group"
>
    {#each $channels as channel (channel.id)}
        <button
            class="aspect-square flex justify-center items-center border rounded border-slate-600 hover:border-slate-500 transition-all duration-200 focus:scale-[1.02] hover:scale-[1.01] active:scale-[0.99] z-0"
            on:dblclick={() => {
                $mainAreaMode = MainAreaMode.EditingChannel;
            }}
            on:contextmenu|preventDefault|stopPropagation={(e) => rightclickChannel(e, channel)}
        >
            {channel.name}
        </button>
    {/each}
</div>
<ContextMenu key={emptyAreaClick} let:hide={hideContextMenu}>
    <button
        on:click={() => {
            if ($mainAreaMode === MainAreaMode.EditingChannel) {
                return;
            }
            $mainAreaMode = MainAreaMode.EditingChannel;
            hideContextMenu();
        }}>Add channel</button
    >
</ContextMenu>
<ContextMenu key={channelAreaClick} let:hide={hideContextMenu}>
    <button
        on:click={() => {
            rightClickedChannel.playStandalone($context);
            hideContextMenu();
        }}>Play once</button
    >

    <hr />

    <button
        on:click={() => {
            if ($mainAreaMode === MainAreaMode.EditingChannel) {
                return;
            }

            $mainAreaMode = MainAreaMode.EditingChannel;
            hideContextMenu();
        }}>Add channel</button
    >
</ContextMenu>
