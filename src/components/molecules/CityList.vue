<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import List from '../atoms/List.vue';

const props = defineProps({
  cities: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['citySelected']);

const onCitySelect = (city: any) => {
  emit('citySelected', city);
};
</script>

<template>
  <List :items="cities" @select="onCitySelect" />
</template>
