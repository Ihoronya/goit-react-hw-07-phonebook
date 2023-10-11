import { createAction } from '@reduxjs/toolkit';

const changeFilter = createAction('contacts/changeFilter');

const filterAction = {
  changeFilter,
};

export default filterAction;
