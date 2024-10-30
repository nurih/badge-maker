<script setup lang="ts">
import { ref, onMounted } from "vue";

const maxBadgePixels = 800;
const { frameName = "my-frame.png" } = defineProps<{ frameName?: string }>();

const canvas = ref<HTMLCanvasElement | null>(null);
const imageLoaded = ref(false);
const canvasWidth = ref(maxBadgePixels);
const canvasHeight = ref(maxBadgePixels);
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
  }
};

const drawImages = () => {
  if (canvas.value) {
    const ctx = canvas.value.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
      ctx.drawImage(headshotImage, 0, 0, canvasWidth.value, canvasHeight.value);
      ctx.drawImage(vignetteImage, 0, 0, canvasWidth.value + 1, canvasHeight.value + 1);
    }
  }
};

const downloadImage = () => {
  if (canvas.value) {
    const link = document.createElement("a");
    link.href = canvas.value.toDataURL("image/png");
    link.download = `Framed-${headshotName.value}`;
    link.click();
  }
};

function loadFrame(): any {
  vignetteImage.src = frameName;

  vignetteImage.onload = () => {
    const squared = cropImageToSquare(vignetteImage);
    canvasWidth.value = Math.min(vignetteImage.width, maxBadgePixels);
    canvasHeight.value = Math.min(vignetteImage.width, maxBadgePixels);
    if (squared && canvas.value) {
      scribble(squared, canvas.value);
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
    <p>
      Upload a square headshot, and it will let you download a framed version, suitable
      for badges on your favorite social media site.
    </p>
    <input type="file" @change="onFileChange" accept="image/*" />
    <em v-if="headshotName != ''">
      <button @click="downloadImage" :disabled="!imageLoaded">Download Badge</button>
      Badge will be named: <b>{{ downloadedFileName() }}</b>
    </em>
    <div v-if="headshotName">
      <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
    <div v-else>
      <img
        :src="frameName"
        :width="maxBadgePixels"
        :height="maxBadgePixels"
        alt="frame file name"
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

button,
input {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
