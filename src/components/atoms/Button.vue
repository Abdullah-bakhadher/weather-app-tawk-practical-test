<template>
  <button
      class="w-full py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>