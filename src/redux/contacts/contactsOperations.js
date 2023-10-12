import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsApi from '../../services/contactsFetch-api';

const getALLContacts = createAsyncThunk(
  'contacts/getALLContacts',
  async (_, { rejectWithValue }) => {
    try {
      return await contactsApi.fetchContacts();
    } catch (error) {
      return rejectWithValue({
        message: 'Помилка при отриманні контактів',
        error,
      });
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (payload, { rejectWithValue }) => {
    try {
      return await contactsApi.fetchAddContact(payload);
    } catch (error) {
      return rejectWithValue({
        message: 'Помилка при отриманні контактів',
        error,
      });
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      return await contactsApi.fetchDeleteContact(id);
    } catch (error) {
      return rejectWithValue({
        message: 'Помилка при отриманні контактів',
        error,
      });
    }
  }
);

const contactsOperations = { getALLContacts, addContact, deleteContact };

export default contactsOperations;
