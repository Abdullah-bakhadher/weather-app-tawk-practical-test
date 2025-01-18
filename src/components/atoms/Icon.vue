<script lang="ts" setup>
import { computed } from 'vue';
import * as HeroiconsOutline from '@heroicons/vue/24/outline';

// Props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'w-1 h-1',
  },
  type: {
    type: String,
    default: 'outline',
  },
});

// Computed classes for size
const computedClasses = computed(() => `${props.size}`);

// Computed property for icon component
const iconComponent = computed(() => {
  const icons = HeroiconsOutline;
  const icon = icons[props.name];
  if (!icon) {
    console.error(`Icon "${props.name}" not found in Heroicons (${props.type})`);
    return null;
  }
  return icon;
});
</script>
<template>
  <component :is="iconComponent" :class="computedClasses" aria-hidden="true" v-if="iconComponent" />
</template>
