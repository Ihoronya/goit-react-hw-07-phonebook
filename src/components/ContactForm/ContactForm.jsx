import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from '../../redux/operations/contactsOperations';
import { getContacts } from '../../redux/selectors/contactsSelectors';
import s from './ContactForm.module.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zAZа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Name may contain only letters'
      )
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    number: Yup.string()
  .matches(
    /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/,
    'Ukraine phone number format: +38 (0XX) XXX-XX-XX'
  )
  .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { name, number } = values;

      if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        toast.error(`${name} is already in contacts.`);
      } else {
        dispatch(contactsOperations.addContact({ name, number }));
      }

      resetForm();
    },
  });

  return (
    <form className={s.form} onSubmit={formik.handleSubmit}>
      <label className={s.label}>
        Name
        <br />
        <input
          className={s.input}
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter name"
        />
        {formik.touched.name && formik.errors.name && (
          <div className={s.error}>{formik.errors.name}</div>
        )}
      </label>
      <label className={s.label}>
        Number
        <br />
        <InputMask
          className={s.input}
          type="tel"
          name="number"
          mask="+38 (999) 999-99-99"
          maskChar=""
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter phone number"
        />
        {formik.touched.number && formik.errors.number && (
          <div className={s.error}>{formik.errors.number}</div>
        )}
      </label>
      <button className={s.btn} type="submit">
        <p className={s.discription}>Add contact</p>
      </button>
    </form>
  );
}
