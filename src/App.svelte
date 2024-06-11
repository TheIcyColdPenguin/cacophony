<script lang="ts">
    import Channels from "./components/Channels.svelte";
    import EditingChannel from "./components/EditingChannel.svelte";
    import Main from "./components/Main.svelte";
    import { mainAreaMode } from "./stores/mainAreaMode";
    import { MainAreaMode } from "./types/mainareamodes";
</script>

<main class="w-full h-screen grid grid-cols-12 bg-slate-950">
    <Channels />
    {#if $mainAreaMode == MainAreaMode.EditingChannel}
        <EditingChannel />
    {:else}
        <Main />
    {/if}
</main>
