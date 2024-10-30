<script setup lang="ts">
import { ref } from "vue";
import BadgeGenerator from "./components/BadgeGenerator.vue";

const canvasSize = ref<number>(512);
</script>

<template>
  <div class="card">
    <p>
      Upload a square headshot, and it will let you download a framed version, suitable
      for badges on your favorite social media site.
    </p>

    <input
      type="range"
      min="256"
      max="2048"
      @change="(e:Event)=> canvasSize = e.target.value"
    />

    
    <p>
      Final image size will be <b>{{ canvasSize }}&nbsp;pixels</b>. Changing the size will
      reset input file and you will need to upload it again.
    </p>
  </div>
  <BadgeGenerator
    frame-name="pass-badge.png"
    :canvas-size="Number(canvasSize)"
  />
</template>

<style scoped></style>
