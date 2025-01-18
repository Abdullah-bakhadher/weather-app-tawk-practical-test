<script setup lang="ts">
import { ref, watch } from 'vue';
import Icon from './Icon.vue'; // Importing the Icon component for reusability

// Define component props
const props = defineProps({
  src: {
    type: String, // Source URL of the image
    required: true,
  },
  alt: {
    type: String, // Alternative text for the image
    default: '',
  },
  isEdit: {
    type: Boolean, // Determines if the edit button is shown
    default: false,
  },
});

// Reactive variable to store the image URL
const imageUrl = ref<string | null>(null);
// Reference to the file input element
const fileInput = ref<HTMLInputElement | null>(null);

// Function to cache an image URL for performance
const cacheImage = async (url: string): Promise<string> => {
  const cacheName = 'profile-pictures'; // Cache name
  const cache = await caches.open(cacheName); // Open the cache

  // Check if the image is already cached
  const cachedResponse = await cache.match(url);
  if (cachedResponse) {
    return url; // Return the cached URL
  }

  // Fetch and cache the image
  const response = await fetch(url);
  if (response.ok) {
    await cache.put(url, response);
    return url;
  }

  throw new Error(`Failed to fetch and cache image from ${url}`); // Handle fetch errors
};

// Watch for changes in the `src` prop and update `imageUrl`
watch(
  () => props.src,
  async (newSrc) => {
    if (newSrc) {
      try {
        imageUrl.value = await cacheImage(newSrc); // Cache the new image
      } catch (error) {
        console.error('Error caching image:', error);
        imageUrl.value = null; // Reset imageUrl on error
      }
    } else {
      imageUrl.value = null; // Clear imageUrl if `src` is empty
    }
  },
  { immediate: true } // Run immediately on initialization
);

// Function to trigger the hidden file input click event
const triggerFileUpload = () => {
  fileInput.value?.click(); // Simulate a click on the file input
};

// Function to resize an image file to fit within a specified size
const resizeImage = async (file: File, maxSize: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1); // Calculate scaling factor
        canvas.width = img.width * scale; // Resize width
        canvas.height = img.height * scale; // Resize height

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw resized image
          resolve(canvas.toDataURL('image/jpeg')); // Return the resized image as a Data URL
        } else {
          reject('Failed to get canvas context');
        }
      };
      img.src = event.target?.result as string; // Set the image source
    };

    reader.onerror = () => reject('Failed to read file');
    reader.readAsDataURL(file); // Read the file as a Data URL
  });
};

// Handle the file input change event
const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // Check if the file exceeds the size limit
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    try {
      // Resize and update the `imageUrl`
      imageUrl.value = await resizeImage(file, 100);
    } catch (error) {
      console.error('Error resizing image:', error);
    }
  }
};
</script>
<template>
  <!-- A container for the image and upload button -->
  <div class="relative">
    <!-- Display the profile picture if `imageUrl` is available -->
    <img v-if="imageUrl" :src="imageUrl" :alt="alt || 'Profile Picture'" class="rounded-full object-cover" />

    <!-- Display an edit button if `isEdit` is true -->
    <button v-if="isEdit" @click="triggerFileUpload"
      class="absolute bottom-1 right-1 bg-gray-200 p-2 rounded-full hover:bg-gray-300">
      <!-- Icon component for the pencil/edit icon -->
      <Icon name="PencilIcon" size="w-5 h-5" />
    </button>

    <!-- Hidden file input for uploading a new profile picture -->
    <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileChange" />
  </div>
</template>
