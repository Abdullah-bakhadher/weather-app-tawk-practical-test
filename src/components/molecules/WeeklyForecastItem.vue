<script setup lang="ts">
import { defineProps } from 'vue';
import { formatDay } from '@/utils/time.ts';
import Image from '@/components/atoms/Image.vue';

defineProps({
  date: Number,
  iconUrl: String,
  description: String,
  temperature: Number,
});
</script>

<template>
  <div class="flex items-center bg-blue-200 rounded-lg p-4">
    <div class="bg-blue-300 rounded-full p-1">
      <Image :src="iconUrl" :alt="description" class="w-12 h-12" />
    </div>
    <div class="ml-4 flex-1">
      <p class="text-lg font-semibold">{{ formatDay(date) }}</p>
      <p class="text-sm capitalize">{{ description }}</p>
    </div>
    <p class="text-lg font-bold">{{ temperature }}°C</p>
  </div>
</template>
