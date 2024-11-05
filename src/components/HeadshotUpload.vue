<script setup lang="ts">
import FileUpload, { FileUploadSelectEvent } from "primevue/fileupload";

const headshotImage: HTMLImageElement = new Image();

export interface UploadedImage {
  image: HTMLImageElement;
  fileName: string;
}

const emitImage = defineEmits<{ headshotUploaded: UploadedImage[] }>();

const onFileChange = (event: FileUploadSelectEvent) => {
  const file = (event.originalEvent.target as HTMLInputElement).files?.[0];
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
    <FileUpload
      mode="basic"
      accept="image/*"
      @select="onFileChange"
      :auto="true"
      choose-label="Choose a headshot"
    ></FileUpload>
  </p>
</template>
