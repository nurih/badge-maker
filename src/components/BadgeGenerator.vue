<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps({
  frameName: { type: String, required: true },
  canvasSize: { type: Number, required: true },
});

const zoom = ref<Number>(100);

const mainCanvas = ref<HTMLCanvasElement | null>(null);
const imageLoaded = ref(false);

let headshotImage = new Image();
let vignetteImage = new Image();

const headshotName = ref("");

onMounted(loadFrame);

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    headshotName.value = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      headshotImage.src = reader.result as string;
      headshotImage.onload = () => {
        imageLoaded.value = true;
        drawImages();
      };
    };
    reader.readAsDataURL(file);
  } else {
    headshotName.value = "";
  }
};

const drawImages = () => {
  if (mainCanvas.value) {
    const ctx = mainCanvas.value.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, props.canvasSize, props.canvasSize);
      ctx.drawImage(headshotImage, 0, 0, props.canvasSize, props.canvasSize);
      ctx.drawImage(vignetteImage, 0, 0, props.canvasSize + 1, props.canvasSize + 1);
    }
  }
};

const downloadImage = () => {
  if (mainCanvas.value) {
    const link = document.createElement("a");
    link.href = mainCanvas.value.toDataURL("image/png");
    link.download = `Framed-${headshotName.value}`;
    link.click();
  }
};

function loadFrame(): any {
  vignetteImage.src = props.frameName;

  vignetteImage.onload = () => {
    const appWidth = window.innerWidth;
    const zoomLevel:number = vignetteImage.width > appWidth? Math.ceil(100* appWidth/vignetteImage.width): 100;
    console.log(`Zoom level computed to on ${appWidth} with frame ${vignetteImage.width}  to be ${zoomLevel}`);
    zoom.value = zoomLevel;

    const squared = cropImageToSquare(vignetteImage);

    if (squared && mainCanvas.value) {
      scribble(squared, mainCanvas.value);
    }
  };
}

function cropImageToSquare(image: HTMLImageElement): HTMLCanvasElement {
  const scratchCanvas = document.createElement("canvas");
  const scratchCanvasContext = scratchCanvas.getContext("2d");

  if (!scratchCanvasContext) {
    throw new Error("Could not get canvas context");
  }

  const size = Math.max(image.width, image.height);
  const offsetX = (image.width - size) / 2;
  const offsetY = (image.height - size) / 2;

  scratchCanvas.width = size;
  scratchCanvas.height = size;

  scratchCanvasContext.drawImage(image, offsetX, offsetY, size, size, 0, 0, size, size);

  return scratchCanvas;
}

const downloadedFileName = () => {
  return "Framed-" + headshotName.value;
};

const scribble = (src: HTMLCanvasElement, dest: HTMLCanvasElement) => {
  if (src && dest) {
    console.log(`scribble ${src.width} => ${dest.width}`);
    const sourceContext = src.getContext("2d");
    const destinationContext = dest.getContext("2d");

    if (sourceContext && destinationContext) {
      // Draw the source canvas onto the destination canvas
      destinationContext.clearRect(0, 0, dest.width, dest.height);
      destinationContext.drawImage(src, 0, 0);
    }
  }
};
</script>

<template>
  <div class="badge-generator">
    <input type="file" @change="onFileChange" accept="image/*" :key="canvasSize" />
    <p>
      Zoom
      <input
        type="range"
        min="10"
        max="100"
        :value="zoom"
        @change="(e:Event)=> {zoom = e.target.value}"
      />
      {{ zoom }}%. (does not affect image size, only the display here.)
    </p>
    <div v-if="headshotName != ''">
      <p>
        Badge will be named: <b>{{ downloadedFileName() }}</b>
      </p>
      <p>
        <button @click="downloadImage" :disabled="!imageLoaded">Download Badge</button>
      </p>
    </div>
    <div v-if="headshotName">
      <canvas
        id="mainCanvas"
        ref="mainCanvas"
        :width="canvasSize"
        :height="canvasSize"
        :style="{ zoom: zoom + '%' }"
      ></canvas>
    </div>
    <div v-else>
      <img
        :src="frameName"
        :width="canvasSize"
        :height="canvasSize"
        alt="frame file name"
        :style="{ zoom: zoom + '%' }"
      />
    </div>
  </div>
</template>

<style scoped>
.badge-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

canvas {
  border: 1px solid #ccc;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

button {
  background-color: greenyellow;
}

#mainCanvas {
  border: 1px solid grey;
}
</style>
