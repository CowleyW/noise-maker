<script>
    import {Canvas, Layer} from "svelte-canvas";

    export let noises;

    $: render = ({context, width, height}) => {
        let imageData = context.getImageData(0, 0, width, height);
        let data = imageData.data;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let intensity = 0;
                for (let i = 0; i < noises.length; i++) {
                    const {octave, amplitude} = noises[i];
                    intensity += octave.get(x, y) / 256 * amplitude;
                }
                data[(x + y * 512) * 4] = intensity;
                data[(x + y * 512) * 4 + 1] = intensity;
                data[(x + y * 512) * 4 + 2] = intensity;
                data[(x + y * 512) * 4 + 3] = 255;
            }
        }
        context.putImageData(imageData, 0, 0);
    }
</script>

<div>
    <Canvas width="512" height="512">
        <Layer {render}/>
    </Canvas>
</div>