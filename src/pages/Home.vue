<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { useWeatherStore } from '@/store/weather';
import { getCurrentPosition } from '@/utils/geolocation';
import CitySearch from "@/components/organisms/CitySearch.vue";
import WeatherCardList from "@/components/organisms/WeatherCardList.vue";
import Icon from '@/components/atoms/Icon.vue';

const router = useRouter();
const weatherStore = useWeatherStore();
const searching = ref(false);

const setSearching = (isSearching: boolean) => {
  searching.value = isSearching;
};

const goToUserProfile = () => {
  router.push({ name: 'UserProfile' });
}

const fetchWeather = async () => {
  const { latitude, longitude, city, state, country } = await getCurrentPosition();
  await weatherStore.fetchWeatherData(latitude, longitude, city, state, country, true);
};


onMounted(async () => {
  if (!weatherStore.weatherData.length) {
    await fetchWeather();
  }
});

onActivated(async () => {
  if (!weatherStore.weatherData.length) {
    await fetchWeather();
  }
});
</script>

<template>
  <div>

    <div v-if="!searching" class="flex justify-between items-center mt-4 transition-opacity duration-500" :class="{
      'opacity-0 pointer-events-none': searching,
      'opacity-100': !searching,
    }">
      <h1 class="text-3xl semi-bold">Weather</h1>
      <Icon name="UserIcon" size="w-6 h-6" class="cursor-pointer" @click="goToUserProfile" />
    </div>

    <CitySearch @searching="setSearching" />

    <WeatherCardList class="transition-opacity duration-500"
      :class="{ 'opacity-0 pointer-events-none': searching, 'opacity-100': !searching }" />

  </div>
</template>
