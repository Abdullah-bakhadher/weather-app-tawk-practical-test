<script setup lang="ts">
import { defineProps } from 'vue';
import { formatDate, convertToLocalTime } from '@/utils/time.ts';
import Image from '@/components/atoms/Image.vue';

const props = defineProps({
  date: Number,
  iconUrl: String,
  description: String,
  temperature: Number,
  timeZone: Number,
});
</script>
<template>
  <div class="text-center">
    <p class="text-sm">{{ formatDate(date) }}</p>
    <div class="flex justify-center items-center">
      <Image :src="iconUrl" :alt="description" />
    </div>
    <p class="text-lg font-semibold">{{ temperature }}°C</p>
    <p class="text-xl font-bold capitalize mt-2">{{ description }}</p>
    <p class="text-sm mt-2">Last Update {{ convertToLocalTime(timeZone) }}</p>
  </div>
</template>
