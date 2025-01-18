<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});

defineEmits(['select']);
</script>

<template>
  <ul v-if="items.length" class="mt-2">
    <li v-for="item in items" :key="item.id" class="p-2 cursor-pointer border-b border-gray-300"
      @click="$emit('select', item)">
      <span class="text-gray-900 font-medium">{{ item.city }}</span>
      <template v-if="item.state || item.county">
        , <span class="text-gray-700">{{ item.state || item.county }}</span>
      </template>
      , <span class="text-gray-700">{{ item.country }}</span>
    </li>
  </ul>
</template>
