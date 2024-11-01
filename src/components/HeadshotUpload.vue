<script setup lang="ts">
const headshotImage: HTMLImageElement = new Image();

export interface UploadedImage {
  image: HTMLImageElement;
  fileName: string;
}

const emitImage = defineEmits<{ headshotUploaded: UploadedImage[] }>();

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      headshotImage.src = reader.result as string;
      headshotImage.onload = () => {
        emitImage("headshotUploaded", {
          fileName: file.name,
          image: headshotImage,
        });
      };
    };
    reader.readAsDataURL(file);
  }
};
</script>
<template>
  <p>
    Select a headshot image:
    <input type="file" @change="onFileChange" accept="image/*" />
  </p>
</template>
