<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Gestion de contact</h1>
        <button
          @click="openCreateModal"
          class="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusIcon class="h-5 w-5" />
          Nouveau contact
        </button>
      </div>
      <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <div v-for="toast in toasts" :key="toast.id"
             :class="['px-4 py-2 rounded-md shadow-lg text-white',
                   toast.type === 'success' ? 'bg-green-500' :
                   toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500']">
          {{ toast.message }}
        </div>
      </div>

      <div class="mb-6">
        <SearchInput v-model="searchQuery" />
      </div>

      <ContactsTable
        :contacts="filteredContacts"
        :loading="loading"
        @edit="openEditModal"
        @delete="confirmDelete"
      />

      <ContactModal
        v-if="showModal"
        :is-editing="isEditing"
        :form="form"
        @close="closeModal"
        @submit="isEditing ? updateContact() : createContact()"
      />

      <ConfirmModal
        v-if="showDeleteModal"
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce contact ? Cette action est irréversible."
        @confirm="deleteContact"
        @cancel="showDeleteModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ContactsTable from './components/ContactsTable.vue';
import ContactModal from './components/ContactModal.vue';
import ConfirmModal from './components/ConfirmModal.vue';
import SearchInput from './components/SearchInput.vue';
import PlusIcon from './components/icons/PlusIcon.vue';
import { fetchContacts as fetchContactsService, createContact as createContactService, updateContact as updateContactService, deleteContact as deleteContactService } from './service/contact.js';

// Données
const contacts = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedContactId = ref(null);
const toasts = ref([]);

const form = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
});

// Toast de notification
function showToast(message, type = 'info') {
  const id = Date.now();
  toasts.value.push({ id, message, type });


  setTimeout(() => {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
  }, 3000);
}

// Computed
const filteredContacts = computed(() => {
  if (!contacts.value) return [];
  if (!searchQuery.value) return contacts.value;

  const query = searchQuery.value.toLowerCase();
  return contacts.value.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      contact.address?.toLowerCase().includes(query)
  );
});

onMounted(fetchContacts);

// Récup de tous les contacts
async function fetchContacts() {
  try {
    loading.value = true;
    contacts.value = await fetchContactsService();
  } catch (error) {
    showToast('Erreur lors de la récupération des contacts', 'error');
    contacts.value = [];
  } finally {
    loading.value = false;
  }
}

function openCreateModal() {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
}

function openEditModal(contact) {
  form.value = { ...contact };
  selectedContactId.value = contact.id;
  isEditing.value = true;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function resetForm() {
  form.value = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
}

// Création d'un contact
async function createContact() {
  try {
    const response = await createContactService(form.value);
    if (response.success) {
      showToast(response.message, 'success');
    }
    await fetchContacts();
    closeModal();
  } catch (error) {
    showToast('Erreur lors de la création du contact', 'error');
  }
}

// Mise à jour d'un contact
async function updateContact() {
  try {
    const response = await updateContactService(selectedContactId.value, form.value);
    if (response.success) {
      showToast(response.message, 'success');
    }
    await fetchContacts();
    closeModal();
  } catch (error) {
    showToast('Erreur lors de la mise à jour du contact', 'error');
  }
}

function confirmDelete(contact) {
  selectedContactId.value = contact.id;
  showDeleteModal.value = true;
}

// Suppression d'un contact
async function deleteContact() {
  try {
    const response = await deleteContactService(selectedContactId.value);
    if (response.success) {
      showToast(response.message, 'success');
    }
    await fetchContacts();
  } catch (error) {
    showToast('Erreur lors de la suppression du contact', 'error');
  } finally {
    showDeleteModal.value = false;
  }
}
</script>
