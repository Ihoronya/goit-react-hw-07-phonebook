import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contactsFilterAction';
import contactsOperations from './contactsOperations';

const { getALLContacts, addContact, deleteContact } = contactsOperations;

const contacts = createReducer([], builder => {
  builder
    .addCase(getALLContacts.fulfilled, (state, action) => {
      state.push(...action.payload);
    })
    .addCase(addContact.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      return state.filter(({ id }) => id !== action.payload.id);
    });
});

const filter = createReducer('', builder => {
  builder.addCase(actions.changeFilter, (_state, action) => action.payload);
});

const isLoading = createReducer(false, builder => {
  builder
    .addCase(getALLContacts.pending, () => true)
    .addCase(getALLContacts.fulfilled, () => false)
    .addCase(getALLContacts.rejected, () => false)
    .addCase(addContact.pending, () => true)
    .addCase(addContact.fulfilled, () => false)
    .addCase(addContact.rejected, () => false)
    .addCase(deleteContact.pending, () => true)
    .addCase(deleteContact.fulfilled, () => false)
    .addCase(deleteContact.rejected, () => false);
});

const error = createReducer(null, builder => {
  builder
    .addCase(getALLContacts.pending, () => null)
    .addCase(getALLContacts.rejected, (_state, action) => action.error.message)
    .addCase(addContact.pending, () => null)
    .addCase(addContact.rejected, (_state, action) => action.error.message)
    .addCase(deleteContact.pending, () => null)
    .addCase(deleteContact.rejected, (_state, action) => action.error.message);
});

export default combineReducers({
  contacts,
  filter,
  isLoading,
  error,
});
