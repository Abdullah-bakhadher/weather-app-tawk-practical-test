<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  readonly: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col w-full px-4 bg-gray-100 rounded-xl">
      <label v-if="$slots.label" for="input" class="text-xs text-gray-400 font-light pt-2 text-left">
        <slot name="label" />
      </label>
      <div class="flex items-center w-full">
        <slot v-if="$slots.left" name="left" />
        <input id="input" :placeholder="placeholder" :type="type" :readonly="readonly" v-bind="$attrs"
          :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
          class="w-full bg-gray-100 text-base text-gray-700 placeholder-gray-400 focus:outline-none pb-2 pt-2" />
        <slot v-if="$slots.right" name="right" />
      </div>
      <div v-if="$slots.error" class="mb-1">
        <slot name="error" />
      </div>
    </div>
  </div>
</template>
