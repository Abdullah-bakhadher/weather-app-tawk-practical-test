<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import sunrise from '../../assets/img/sunraise.jpg';
import sunset from '../../assets/img/sunset.jpg';
defineProps<{
  cards: Array<{
    id: number;
    country: string;
    location: string;
    temperature: number;
    highTemp: number;
    lowTemp: number;
    myLocation: boolean;
    time: string;
    description: string;
    isAM: boolean;
  }>;
}>();

const emit = defineEmits(['navigateToDetails']);

const handleNavigateToDetails = (id: number) => {

  emit('navigateToDetails', id);
};

</script>

<template>
  <div class="flex flex-col gap-3 cursor-pointer">
    <!-- Loop through the cards and render each card -->
    <div v-for="(card, index) in cards" :key="index" class=" text-white rounded-3xl p-4 flex flex-col relative" :style="{
      backgroundImage: card.isAM ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + sunrise + ')'
        : 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + sunset + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: card.isAM ? 0.7 : 0.6
    }" @click="handleNavigateToDetails(card.id)">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="text-xl font-bold">{{ card.myLocation ? 'My Location' : '' }}</div>
          <div class="text-xl font-bold">{{ card.myLocation ? '' : card.location }}</div>
          <div class="text-sm">{{ card.time }}</div>
          <div class="mt-4 text-sm text-left">{{ card.description }}</div>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-4xl font-bold">{{ card.temperature }}°</div>
          <div class="mt-4 text-sm">
            <span class="mr-2">H: {{ card.highTemp }}°</span>
            <span>L: {{ card.lowTemp }}°</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
