<script setup lang="ts">
import { ref, onMounted } from "vue";

const container = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
const scale = ref<number>(0.9);
const renderedSz = ref<number>(0);
let originX = 0;
let originY = 0;
let startX: number;
let startY: number;

const { headshot, frame, downloadedFileName, pixelCount } = defineProps({
  headshot: { type: Image, required: true },
  frame: { type: Image, required: true },
  downloadedFileName: { type: String, required: true },
  pixelCount: { type: Number, required: true },
});

const drawImages = () => {
  if (!(ctx && container.value)) return;

  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height);

  const headshotMinAxisL = Math.min(headshot.width, headshot.height);
  const frameMinAxisL = Math.min(frame.width, frame.height);

  renderedSz.value = Math.floor(Math.min(headshot.width, headshot.height) * scale.value);

  //draw headshot
  ctx.drawImage(
    headshot,
    0,
    0,
    headshotMinAxisL,
    headshotMinAxisL,
    originX,
    originY,
    renderedSz.value,
    renderedSz.value
  );

  // draw frame
  ctx.drawImage(
    frame,
    0,
    0,
    frameMinAxisL,
    frameMinAxisL,
    originX,
    originY,
    renderedSz.value,
    renderedSz.value
  );
};

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  const { offsetX, offsetY } = event;
  const wheel = event.deltaY < 0 ? 1.1 : 0.9;
  const newScale = scale.value * wheel;
  const newOriginX = offsetX - ((offsetX - originX) * newScale) / scale.value;
  const newOriginY = offsetY - ((offsetY - originY) * newScale) / scale.value;

  scale.value = newScale;
  originX = newOriginX;
  originY = newOriginY;

  drawImages();
};

const handleMouseDown = (event: MouseEvent) => {
  startX = event.clientX - originX;
  startY = event.clientY - originY;
  container.value!.addEventListener("mousemove", handleMouseMove);
  container.value!.addEventListener("mouseup", handleMouseUp);
};

const handleMouseMove = (event: MouseEvent) => {
  originX = event.clientX - startX;
  originY = event.clientY - startY;
  drawImages();
};

const handleMouseUp = () => {
  container.value!.removeEventListener("mousemove", handleMouseMove);
  container.value!.removeEventListener("mouseup", handleMouseUp);
};

const handleTouchStart = (event: TouchEvent) => {
  const touches = event.touches;
  if (touches.length === 2) {
    startX = (touches[0].clientX + touches[1].clientX) / 2;
    startY = (touches[0].clientY + touches[1].clientY) / 2;
  }
};

const handleTouchMove = (event: TouchEvent) => {
  const touches = event.touches;
  if (touches.length === 2) {
    const newStartX = (touches[0].clientX + touches[1].clientX) / 2;
    const newStartY = (touches[0].clientY + touches[1].clientY) / 2;
    const dx = newStartX - startX;
    const dy = newStartY - startY;
    originX += dx;
    originY += dy;
    startX = newStartX;
    startY = newStartY;

    drawImages();
  }
};

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = container.value!.clientWidth;
    canvas.value.height = container.value!.clientHeight;
    ctx = canvas.value.getContext("2d")!;

    scale.value = canvas.value!.width / Math.max(headshot.width, headshot.height);
    drawImages();

    container.value!.addEventListener("wheel", handleWheel);
    container.value!.addEventListener("mousedown", handleMouseDown);
    container.value!.addEventListener("touchstart", handleTouchStart);
    container.value!.addEventListener("touchmove", handleTouchMove);
  }
});

function makeFinal() {
  const sz = pixelCount;
  const cnv = document.createElement("canvas");
  cnv.height = sz;
  cnv.width = sz;
  const cx = cnv.getContext("2d")!;

  cx.clearRect(0, 0, sz, sz);
  cx.drawImage(headshot, 0, 0, sz, sz);
  cx.drawImage(frame, 0, 0, sz, sz);

  return cnv;
}

const downloadImage = () => {
  if (canvas.value) {
    try {
      const link = document.createElement("a");
      link.href = makeFinal().toDataURL("image/png");
      // link.href = canvas.value.toDataURL("image/png");
      link.download = `framed_${pixelCount}_${downloadedFileName}`;
      link.click();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<template>
  <button @click="downloadImage">Download</button>

  <fieldset>
    <legend>Zoomed {{ (100 * scale).toFixed(2) }}%</legend>

    <div id="drawingArea" class="container" ref="container">
      <canvas ref="canvas"></canvas>
    </div>
  </fieldset>
</template>

<style scoped>
.container {
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  position: relative;
  border: green 2px double;
}
div.container > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
