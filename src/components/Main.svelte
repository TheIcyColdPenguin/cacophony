<script lang="ts">
    import { clicks } from "../stores/clicks";
    import { mainAreaMode } from "../stores/mainAreaMode";
    import { MainAreaMode } from "../types/mainareamodes";
    import ContextMenu from "./ContextMenu.svelte";

    const clickKey = Symbol("MainEmptyClick");

    function rightclick(e: MouseEvent) {
        $clicks = { [clickKey]: { x: e.clientX, y: e.clientY, primary: false } };
    }
</script>

<div
    on:contextmenu|stopPropagation|preventDefault={rightclick}
    role="main"
    class="col-span-11 h-full bg-slate-800"
></div>
<ContextMenu key={clickKey} let:hide={hideContextMenu}>
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
