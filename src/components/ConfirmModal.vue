<template>
  <div class="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-500">
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        <p class="text-gray-600 mb-6">{{ message }}</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annuler
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import XIcon from './icons/XIcon.vue'

defineProps({
  title: {
    type: String,
    default: 'Confirmation'
  },
  message: {
    type: String,
    required: true
  }
})

defineEmits(['confirm', 'cancel'])
</script>