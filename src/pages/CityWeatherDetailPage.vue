<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWeatherStore } from '@/store/weather';
import TopSection from '@/components/organisms/TopSection.vue';
import HourlyForecast from '@/components/organisms/HourlyForecast.vue';
import WeeklyForecast from '@/components/organisms/WeeklyForecast.vue';

const weatherStore = useWeatherStore();
const route = useRoute();
const id = route.params.id;

onMounted(() => {
  if (id) {
    weatherStore.setWeatherDetail(id);
  }
});
</script>
<template>
  <!-- weatherStore{{ weatherStore.weatherData }} -->
  <TopSection />
  <div class="container mx-auto p-3">
    <HourlyForecast />
    <WeeklyForecast />
  </div>
</template>
