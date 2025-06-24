<template>
  <div class="bg-white rounded-xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading">
            <td colspan="5" class="px-6 py-4 text-center">
              <div class="flex justify-center">
                <Spinner class="h-5 w-5 text-indigo-600" />
                En cours...
              </div>
            </td>
          </tr>
          <tr v-else-if="contacts.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500">Aucun contact</td>
          </tr>
          <tr v-for="contact in contacts" :key="contact.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-indigo-600 font-medium">{{ contact.name.charAt(0) }}</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ contact.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                v-if="contact.address"
            >{{ contact.address }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                v-else
            >
              <span class="w-auto bg-gray-500 h-0.5 block rounded-xl"> </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="$emit('edit', contact)" class="text-indigo-600 hover:text-indigo-900 mr-3">Modifier</button>
              <button @click="$emit('delete', contact)" class="text-red-600 hover:text-red-900">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Spinner from './icons/Spinner.vue'

defineProps({
  contacts: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['edit', 'delete'])
</script>