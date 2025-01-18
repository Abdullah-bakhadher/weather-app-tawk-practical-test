<template>
  <div>
    <h1 class="text-xl font-semibold mb-4 text-left">Hourly Forecast</h1>
    <!-- weatherForecast{{ weatherForecast }} -->
    <div class="flex space-x-4 overflow-x-auto scrollbar-none scrollbar-hide  touch-auto flex-nowrap">
      <HourlyForecastItem v-for="(item, index) in weatherForecast?.list" :key="index" :date="item.dt"
        :iconUrl="`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@4x.png`"
        :description="item.weather[0]?.description" :temperature="kelvinToCelsius(item?.main?.temp)"
        class="flex-none w-1/4" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '@/store/weather';
import HourlyForecastItem from '@/components/molecules/HourlyForecastItem.vue';
import { kelvinToCelsius } from '@/utils/time';
const weatherStore = useWeatherStore();
const weatherForecast = computed(() => weatherStore.weatherForecast);


</script>
