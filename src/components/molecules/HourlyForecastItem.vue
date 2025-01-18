<script setup lang="ts">
import { defineProps } from 'vue';
import { formatLocalTime } from '@/utils/time.ts';
import Image from '@/components/atoms/Image.vue';

const props = defineProps({
  date: Number,
  iconUrl: String,
  description: String,
  temperature: Number,
});
</script>

<template>
  <div class="bg-gray-200 rounded-lg p-4 w-2/6  flex flex-col items-center justify-center shadow-md">
    <Image :src="iconUrl" :alt="description" class="w-24 h-24" />
    <p class="text-md font-semibold">{{ temperature }}°C</p>
    <p class="text-xs mt-2">{{ formatLocalTime(date) }}</p>
  </div>
</template>
