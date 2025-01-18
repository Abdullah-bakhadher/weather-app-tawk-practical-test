<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import InputField from "@/components/atoms/InputField.vue";
import Button from "@/components/atoms/Button.vue";
import Image from "@/components/atoms/Image.vue";
import avatarUrl from '@/assets/avatar.svg';
import { useRouter } from 'vue-router';
import Icon from '@/components/atoms/Icon.vue';

const router = useRouter();

const navigateBack = () => {
  router.back();
};

// User interface
interface User {
  fullName: string;
  email: string;
  phone: string;
}

// User data
const user: User = reactive({
  fullName: "Jane Doe",
  email: "jane@gmail.com",
  phone: "+0123456789"
});

// Editable user data
const editedUser: User = reactive({
  ...user
});

// Form readonly state
const isReadonly = ref(true);

// Validation rules
const rules = {
  editedUser: {
    fullName: { required, minLength: minLength(3) },
    email: { required, email },
    phone: { required, minLength: minLength(10) }
  }
};

const v$ = useVuelidate(rules, { editedUser });

// Form fields configuration
const formFields = [
  {
    label: "Full name",
    placeholder: "Jane Doe",
    type: "text",
    model: "fullName",
  },
  {
    label: "Email",
    placeholder: "jane@gmail.com",
    type: "email",
    model: "email",
  },
  {
    label: "Phone",
    placeholder: "+0123456789",
    type: "tel",
    model: "phone",
  },
];

// Handle toggling between edit and save modes
const handleEditToggle = () => {
  if (isReadonly.value) {
    isReadonly.value = false;
    Object.assign(editedUser, user);
  } else {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      Object.assign(user, editedUser);
      isReadonly.value = true;
    } else {
      alert("Please correct the errors in the form.");
    }
  }
};
</script>

<template>
  <div class="relative">
    <nav class="p-4 flex items-center justify-between">
      <Icon name="ChevronLeftIcon" size="w-5 h-5" class="cursor-pointer" @click="navigateBack" />
      <span class="text-xl flex-1 text-center">
        <slot name="title"></slot>
      </span>
      <div class="w-5 h-5">
        <slot name="right-icon"></slot>
      </div>
    </nav>

    <div class="flex flex-col items-center gap-2">
      <div class="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center">
        <Image :src="avatarUrl" alt="Profile" class="w-full h-full rounded-full" :isEdit="!isReadonly" />
      </div>
      <h2 class="text-lg font-bold text-gray-700">{{ user.fullName }}</h2>
      <p class="text-md text-gray-600">
        {{ user.email }} | {{ user.phone }}
      </p>
    </div>

    <!-- Dynamically rendered form fields -->
    <form @submit.prevent="handleEditToggle" class="flex flex-col flex-grow gap-4 mt-6">
      <div v-for="(field, index) in formFields" :key="index">
        <InputField v-model="editedUser[field.model]" :placeholder="field.placeholder" :type="field.type"
          :readonly="isReadonly">
          <template #label>{{ field.label }}</template>
          <template #error>
            <div class="text-red-500 text-xs">
              <div v-for="(error, errorIndex) in v$.editedUser[field.model].$errors" :key="errorIndex">
                {{ error.$message }}
              </div>
            </div>
          </template>
        </InputField>
      </div>

      <div class="mt-4">
        <Button @click="handleEditToggle">
          {{ isReadonly ? 'EDIT' : 'SAVE' }}
        </Button>
      </div>
    </form>
  </div>
</template>
