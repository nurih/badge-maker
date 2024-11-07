<script setup lang="ts">
import { ref } from "vue";
import BadgeMaker from "./components/BadgeMaker.vue";
import BADGEMAKER_FRAME_URI from "./buildSettings.ts";
import Card from "primevue/card";
import HeadshotUpload, { UploadedImage } from "./components/HeadshotUpload.vue";
import PixelPicker from "./components/PixelPicker.vue";
const buildTime = __BUILD_TIME__;
const pixelSize = ref<number>(256);

const headshot = ref<HTMLImageElement>();
const frame = new Image();

frame.src = BADGEMAKER_FRAME_URI;
frame.setAttribute("crossOrigin", "anonymous");
frame.onload = () => {
  const p = allowedMaxSize();
  console.log("Loaded frame!");
  maxPixelSize.value = p;
  console.log("Loaded frame!" + p);
};

const fileName = ref("");

const maxPixelSize = ref(256);

const allowedMaxSize = () => {
  if (headshot.value && frame) {
    console.log("Got frame AND headshot");
    return Math.min(
      frame.width,
      frame.height,
      headshot.value.width,
      headshot.value.height
    );
  }
  if (frame) {
    console.log("Got frame only");
    return Math.min(frame.width, frame.height);
  }
  console.log("Got no frame no headshot");
  return 640;
};

const headshotUploadHandler = (e: UploadedImage) => {
  headshot.value = e.image;
  fileName.value = e.fileName;
  maxPixelSize.value = allowedMaxSize();
};
</script>

<template>
  <Card>
    <template #title>Social Media Badge Maker</template>
    <template #content>
      <p>
        Upload a square headshot, and it will let you download a framed version, suitable
        for badges on your favorite social media site.
      </p>
    </template>
  </Card>

  <Card>
    <template #content>
      <HeadshotUpload @headshot-uploaded="headshotUploadHandler" />

      <div class="thumbs flex-container">
        <img :src="frame.src" :alt="`frame ${frame.width}x${frame.height}`" />
        <img
          v-if="headshot"
          :src="headshot.src"
          :alt="`headshot ${headshot.width}x${headshot.height}`"
        />
      </div>
      <p>
        Slide to change final badge width and height. Currently
        <b>{{ pixelSize }} X {{ pixelSize }} pixels</b>.
        <PixelPicker
          v-on:selected-size="(n) => (pixelSize = n)"
          :max-pixels="maxPixelSize"
          :key="maxPixelSize"
        />
      </p>
      <BadgeMaker
        v-if="headshot"
        :headshot="headshot"
        :frame="frame"
        :downloaded-file-name="fileName"
        :pixel-count="pixelSize"
        :key="fileName"
      />
    </template>
  </Card>
  <footer>
    <p>
      Frame file
      <em>
        {{ BADGEMAKER_FRAME_URI }}
      </em>
      {{ buildTime }}
    </p>
  </footer>
</template>
<style lang="scss">
@import "/node_modules/primeicons/primeicons.css";
</style>
<style scoped>
input[type="range"] {
  width: 80%;
}

.p-card {
  margin-bottom: 1rem;
  border-radius: 0;
}
.thumbs {
  display: flex;
  justify-content: flex-end;
}
.thumbs > img {
  margin-top: 0.5rem;
  margin-left: 0.5rem;

  height: 90px;
  width: 90px;
}
footer {
  font-size: xx-small;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 25px;
  background: #989898;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 42px;
  background: #444;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 42px;
  background: #444;
  cursor: pointer;
}
</style>
