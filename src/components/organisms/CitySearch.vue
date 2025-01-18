<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useWeatherStore } from '@/store/weather.ts';
import CityList from "@/components/molecules/CityList.vue";
import SearchBar from "@/components/molecules/SearchBar.vue";

const emit = defineEmits(['searching']);
const weatherStore = useWeatherStore();
const query = ref('');

const onCitySelect = async (city: any) => {
  await weatherStore.fetchWeatherData(city.lat, city.lon, city.city, city.state, city.country);
  weatherStore.cities = [];
  query.value = '';
  emit('searching', false);
};

const cities = computed(() => weatherStore.cities);

const isQueryValid = computed(() => query.value.length >= 2);

// Debounced function to fetch cities
const fetchCitiesDebounced = useDebounceFn(async (newQuery: string) => {
  if (isQueryValid.value) {
    emit('searching', true);
    await weatherStore.fetchCities(newQuery);
  }
}, 300);

watch(query, (newQuery) => {
  if (newQuery.length === 0) {
    weatherStore.cities = [];
    emit('searching', false);
    return;
  }

  // Call the debounced function
  fetchCitiesDebounced(newQuery);
});
</script>

<template>
  <div class="my-4">
    <SearchBar v-model="query" />
    <CityList :cities="cities" @citySelected="onCitySelect" />
  </div>
</template>