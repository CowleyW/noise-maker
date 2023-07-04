<script>
    import NoiseRenderer from "../NoiseRenderer.svelte";
    import {SimplexNoise} from "../noise";
    import OctaveRenderer from "../OctaveRenderer.svelte";

    let octaves = [
        {octave: new SimplexNoise(256, 42), amplitude: 128},
        {octave: new SimplexNoise(128, 42), amplitude: 64},
        {octave: new SimplexNoise(64, 42), amplitude: 32},
        {octave: new SimplexNoise(32, 42), amplitude: 16},
        {octave: new SimplexNoise(16, 42), amplitude: 8},
        {octave: new SimplexNoise(8, 42), amplitude: 4}
    ];

    function addOctave() {
        octaves = [...octaves, {octave: new SimplexNoise(2, 42), amplitude: 0}];
    }

    function removeOctave(octave) {
        octaves = octaves.filter((o) => o !== octave);
    }
</script>

<div class="py-12">
    <h1 class="text-7xl font-extrabold text-center text-gray-50">Noisemaker</h1>
    <h2 class="text-center text-gray-50 text-lg font-normal pt-2">Combine and Visualize Simplex Noise</h2>
</div>

<div class="flex flex-row">
    <div class="border-2 rounded-lg m-4 p-2 grow border-zinc-800">
        <h1 class="text-center font-bold text-2xl text-gray-50">Octaves</h1>
        <div class="flex flex-wrap justify-around">
            {#each octaves as noise}
                <div class="my-4 flex flex-row">
                    <OctaveRenderer noise="{noise.octave}"/>

                    <div class="flex flex-col ml-4">
                        <button class="border border-zinc-800 rounded-lg hover:bg-zinc-700 font-medium text-sm text-gray-50 px-2 py-1.5 my-1"
                                on:click={() => noise.octave.frequency = Math.max(noise.octave.frequency / 2, 2)}>
                            Increase Frequency
                        </button>
                        <button class="border border-zinc-800 rounded-lg hover:bg-zinc-700 font-medium text-sm text-gray-50 px-2 py-1.5 my-1"
                                on:click={() => noise.octave.frequency = Math.min(noise.octave.frequency * 2, 256)}>
                            Decrease Frequency
                        </button>
                        <button class="border border-zinc-800 rounded-lg hover:bg-zinc-700 font-medium text-sm text-gray-50 px-2 py-1.5 my-1" on:click={() => removeOctave(noise)}>Remove Octave</button>


                        <div class="w-full">
                            <div class="flex flex-row justify-between">
                                <label class="font-medium text-sm text-gray-50 px-3 py-2">Amplitude</label>
                                <p class="font-medium text-sm text-gray-50 px-3 py-2">{noise.amplitude}</p>
                            </div>
                            <input type="range" bind:value={noise.amplitude} min="0" max="256" class="w-full bg-zinc-800 rounded-full appearance-none accent-blue-700">
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="border-2 rounded-lg m-4 p-2 border-zinc-800">
        <h1 class="text-center font-bold text-2xl text-gray-100">Resultant Noise</h1>
        <div class="my-4">
            <NoiseRenderer noises="{octaves}"/>
        </div>

        <button class="border border-zinc-800 rounded-lg hover:bg-zinc-700 font-medium text-gray-50 px-3 py-2 my-2" on:click={addOctave}>Add Octave</button>
    </div>
</div>