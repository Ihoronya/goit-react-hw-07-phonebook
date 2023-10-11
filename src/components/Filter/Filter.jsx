import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/selectors/contactsSelectors';
import contactsActions from '../../redux/actions/contactsFilterAction';
import s from './Filter.module.css';

export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChange = e =>
    dispatch(contactsActions.changeFilter(e.currentTarget.value));

  return (
    <div className={s.centered}>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
      </label>
    </div>
  );
}
