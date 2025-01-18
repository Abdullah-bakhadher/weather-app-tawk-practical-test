<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/store/weather.ts';
import WeatherInfo from '@/components/molecules/WeatherInfo.vue';
import Icon from '@/components/atoms/Icon.vue';
import { formatDate } from '@/utils/time';
// 

// Access weather store and router
const weatherStore = useWeatherStore();
const weatherDetail = computed(() => {
  console.log('dddddTopSection weatherDetail computed', weatherStore.weatherDetail);
  return weatherStore.weatherDetail;
});
const router = useRouter();
// Navigate back function
const navigateBack = () => {
  router.back();
};

// Delete city function
const deleteCity = (id: string) => {
  weatherStore.deleteCity(id);
  router.push('/');
};
</script>

<template>
  <div class="bg-blue-500 text-white p-6">
    <!-- Navigation Bar -->
    <nav class="p-4 flex items-center justify-between">
      <Icon name="ChevronLeftIcon" size="w-5 h-5" class="cursor-pointer" @click="navigateBack" />
      <span class="text-xl flex-1 text-center">{{ weatherDetail?.name ?? '' }}</span>
      <div class="w-5 h-5">
        <Icon name="TrashIcon" size="w-5 h-5" class="cursor-pointer" @click="deleteCity(weatherDetail?.id)" />
      </div>
    </nav>

    <!-- Weather Info -->
    <WeatherInfo :date="formatDate()"
      :iconUrl="`https://openweathermap.org/img/wn/${weatherDetail?.weather[0]?.icon}@2x.png`"
      :description="weatherDetail?.data?.current.weather[0]?.description" :timeZone="weatherDetail?.timezone"
      :temperature="Math.round(weatherDetail?.main.temp)" />
  </div>
</template>
