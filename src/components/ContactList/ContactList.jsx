import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from '../../redux/operations/contactsOperations';
import { getVisibleContacts } from '../../redux/selectors/contactsSelectors';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  const onDeleteContact = id => dispatch(contactsOperations.deleteContact(id));

  useEffect(() => {
    dispatch(contactsOperations.getALLContacts());
  }, [dispatch]);

  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number, avatar }) => (
        <li className={s.item} key={id}>
          <img src={avatar} alt={avatar} className={s.avatar}></img>
          <span className={s.name}>{name}:</span>
          <span className={s.number}>
            <a href={'tel:number'}>{number}</a>
          </span>
          <button
            className={s.btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
