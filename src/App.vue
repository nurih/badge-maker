<script setup lang="ts">
import { ref, computed } from "vue";
import BADGEMAKER_FRAME_URI from "./buildSettings.ts";
import BadgeMaker from "./components/BadgeMaker.vue";
import HeadshotUpload, { UploadedImage } from "./components/HeadshotUpload.vue";
const buildTime = __BUILD_TIME__;
const pixelSize = ref<number>(256);

const onPixelSizeChanged = (e: Event) => {
  if (e && e.target) {
    pixelSize.value = Number((e.target as HTMLInputElement).value);
    console.log(`pixelSize now ${pixelSize.value}`);
  }
};

const headshot = ref<HTMLImageElement>();

const frame = new Image();

frame.src = BADGEMAKER_FRAME_URI;

frame.setAttribute("crossOrigin", "anonymous");

const fileName = ref("");

const maxPixelSize = computed(() => {
  const result: number = Math.min(
    frame.width,
    frame.height,
    headshot.value?.width || Number.MAX_SAFE_INTEGER,
    headshot.value?.height || Number.MAX_SAFE_INTEGER
  );
  return result;
});

const headshotUploadHandler = (e: UploadedImage) => {
  headshot.value = e.image;
  fileName.value = e.fileName;
};
</script>

<template>
  <div class="card">
    <h1>Social Media Badge Maker</h1>

    <p>
      Upload a square headshot, and it will let you download a framed version, suitable
      for badges on your favorite social media site.
    </p>
  </div>

  <div class="card">
    <HeadshotUpload @headshot-uploaded="headshotUploadHandler" />
  </div>
  <div class="card">
    <p>
      Slide to change final badge width and height. Currently
      <b>{{ pixelSize }} x {{ pixelSize }} pixels</b>.
    </p>
    <p>
      64
      <input type="range" min="64" :max="maxPixelSize" @change="onPixelSizeChanged" />
      {{ maxPixelSize }}
    </p>

    <BadgeMaker
      v-if="headshot"
      :headshot="headshot"
      :frame="frame"
      :downloaded-file-name="fileName"
      :pixel-count="pixelSize"
      :key="fileName"
    />
  </div>
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

<style scoped>
input[type="range"] {
  width: 80%;
}

footer {
  font-size: xx-small;
}
</style>
