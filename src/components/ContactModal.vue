<template>
  <div class="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ isEditing ? 'Modifier le contact' : 'Nouveau contact' }}</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        <form @submit.prevent="$emit('submit')">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Nom <span class="text-red-500">*</span></label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email<span class="text-red-500">*</span></label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone<span class="text-red-500">*</span></label>
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
            </div>
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
              <textarea
                v-model="form.address"
                id="address"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ isEditing ? 'Modifier' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import XIcon from './icons/XIcon.vue'

defineProps({
  isEditing: {
    type: Boolean,
    default: false
  },
  form: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'submit'])
</script>