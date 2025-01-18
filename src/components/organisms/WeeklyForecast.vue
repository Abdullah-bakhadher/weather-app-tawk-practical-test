<template>
  <div>
    <!-- {{ weatherForecast }} -->
    <h1 class="text-xl font-semibold my-4 text-left">Weekly Forecast</h1>
    <div class="space-y-4 overflow-y-auto scrollbar-hide touch-auto h-96">
      <WeeklyForecastItem v-for="(item, index) in weatherForecast?.list" :key="index" :date="item.dt"
        :iconUrl="`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@4x.png`"
        :description="item.weather[0]?.description" :temperature="kelvinToCelsius(item?.main?.temp)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '@/store/weather';
import WeeklyForecastItem from '@/components/molecules/WeeklyForecastItem.vue';
import { kelvinToCelsius } from '@/utils/time';

const weatherStore = useWeatherStore();
const weatherForecast = computed(() => weatherStore.weatherForecast);

// const weeklyForecast = computed(() => {
//   return weatherForecast?.list;
// });
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.touch-auto {
  touch-action: auto;
}
</style>