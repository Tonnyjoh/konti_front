import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchContacts() {
  try {
    const response = await axios.get(`${API_URL}/api/contacts`)
    if (response.data?.success) {
      return response.data.data || []
    } else {
      throw new Error(response.data?.message || 'Failed to fetch contacts')
    }
  } catch (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }
}

export async function createContact(contact) {
  try {
    const response = await axios.post(`${API_URL}/api/contacts/store`, contact)
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to create contact')
    }
    return response.data
  } catch (error) {
    console.error('Error creating contact:', error)
    throw error
  }
}

export async function updateContact(id, contact) {
  try {
    const response = await axios.put(`${API_URL}/api/contacts/update/${id}`, contact)
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to update contact')
    }
    return response.data
  } catch (error) {
    console.error('Error updating contact:', error)
    throw error
  }
}

export async function deleteContact(id) {
  try {
    const response = await axios.delete(`${API_URL}/api/contacts/destroy/${id}`)
    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to delete contact')
    }
    return response.data
  } catch (error) {
    console.error('Error deleting contact:', error)
    throw error
  }
}