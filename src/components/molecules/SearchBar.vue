<script lang="ts" setup>
import { defineEmits } from 'vue';
import InputField from '@/components/atoms/InputField.vue';
import Icon from '@/components/atoms/Icon.vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const clearInput = () => {
  emit('update:modelValue', '');
};
</script>
<template>
  <InputField :readonly="false" :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)"
    placeholder="Search for a city or airport">

    <template #left>
      <div class="px-3 text-gray-400">
        <icon name="MagnifyingGlassIcon" size="w-5 h-5" />
      </div>
    </template>


    <template #right v-if="modelValue">
      <div class="px-3 text-gray-400 cursor-pointer" @click="clearInput">
        <icon name="XMarkIcon" size="w-5 h-5" />
      </div>
    </template>
  </InputField>
</template>