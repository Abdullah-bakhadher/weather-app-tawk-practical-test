<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import WeatherCard from '@/components/molecules/WeatherCard.vue';
import WeatherCardSkeleton from '@/components/molecules/WeatherCardSkeleton.vue';
import { useWeatherStore } from '@/store/weather';
import { convertToLocalTime, checkIfAM } from '@/utils/time';

const router = useRouter();
const weatherStore = useWeatherStore();
const localWeatherData = ref(weatherStore.weatherData);
const cards = computed(() => {
  return localWeatherData.value
    .map(data => ({
      id: data.id,
      country: data.sys.country,
      location: data.name,
      time: convertToLocalTime(data.timezone),
      temperature: data.main.temp,
      description: data.weather[0].description,
      highTemp: data.main.temp_max,
      lowTemp: data.main.temp_min,
      myLocation: data.mylocation,
      isAM: checkIfAM(data.timezone)

    }))
});

const navigateToDetails = (id: any) => {
  router.push({ name: 'CityWeatherDetailPage', params: { id } });
};


</script>
<template>
  <div class="flex flex-col gap-3">
    <WeatherCardSkeleton v-if="localWeatherData.length === 0" v-for="index in 4" :key="'skeleton-' + index" />
    <WeatherCard v-else :cards="cards" @navigateToDetails="navigateToDetails" />
  </div>
</template>
