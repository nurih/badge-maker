<script lang="ts" setup>
import { InputNumber } from "primevue";

defineEmits<{ selectedSize: number[] }>();

const { maxPixels } = defineProps<{ maxPixels: number }>();

</script>
<template>
  <InputNumber
    :min="64"
    :max="maxPixels"
    :step="32"
    inputId="horizontal-buttons"
    showButtons
    buttonLayout="horizontal"
    mode="decimal"
    fluid
    @update:modelValue="(n) => $emit('selectedSize', n)"
  >
    <template #incrementicon>
      <span class="pi pi-plus" />
    </template>
    <template #decrementicon>
      <span class="pi pi-minus" />
    </template>
  </InputNumber>
</template>
