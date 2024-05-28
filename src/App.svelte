<script lang="ts">
    import { synth } from "./stores/synth";
    import { Note } from "./synth/constants/notes";
    import { Shape } from "./synth/constants/shapes";

    function addOscillator() {
        const oscill = $synth.createOscillator({
            frequency: Note.C1 * Math.floor(Math.random() * 4 + 3),
            shape: Shape.Sine,
            gain: 0.2,
            detune: 10 * Math.random(),
        });
        oscill.connect($synth.getDestination()!, {});

        sources = $synth.getSources();
    }

    function play() {
        $synth.getSources().map((source) => source.start());
    }
    function mute() {
        $synth.getSources().map((source) => source.stop());
    }

    let sources = $synth.getSources();
</script>

<main class="w-full grid place-items-center">
    {#each sources as source}
        <div>
            {source.frontend.frequency.value} - {source.frontend.type}
        </div>
    {/each}
    <div>
        <button on:click={addOscillator}>add</button>
        <button on:click={play}>play</button>
        <button on:click={mute}>stop</button>
    </div>
</main>
