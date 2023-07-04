<script>
    import {Canvas, Layer} from "svelte-canvas";

    export let noise;

    $: render = ({context, width, height}) => {
        let imageData = context.getImageData(0, 0, width, height);
        let data = imageData.data;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const intensity = noise.get(x, y);

                data[(x + y * 256) * 4] = intensity;
                data[(x + y * 256) * 4 + 1] = intensity;
                data[(x + y * 256) * 4 + 2] = intensity;
                data[(x + y * 256) * 4 + 3] = 255;
            }
        }
        context.putImageData(imageData, 0, 0);
    }
</script>

<div>
    <Canvas width="256" height="256">
        <Layer {render}/>
    </Canvas>
</div>