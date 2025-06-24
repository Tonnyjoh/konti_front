<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Rechercher des contacts..."
      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <SearchIcon class="h-5 w-5 text-gray-400" />
    </div>
  </div>
</template>

<script setup>
import SearchIcon from './icons/SearchIcon.vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>