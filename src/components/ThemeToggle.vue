<template>
  <ToggleButton
    v-model="checked"
    onLabel="Dark"
    offLabel="Light"
    onIcon="pi pi-moon"
    offIcon="pi pi-sun"
    class="w-36"
    aria-label="Do you confirm"
  />
</template>

<script setup>
import { ToggleSwitch, ToggleButton } from "primevue";
import { ref } from "vue";

const checked = ref(false);
</script>
