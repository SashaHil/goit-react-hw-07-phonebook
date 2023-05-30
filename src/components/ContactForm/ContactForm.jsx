import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, ErrorMessage, Field, Button, Label } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const InputSchema = Yup.object().shape({
  name: Yup.string().required('Must be required'),
  phone: Yup.string().required('Must be required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const isDublicate = ({ name, phone }) => {
    const refName = name.toLowerCase().trim();
    const refphone = phone.trim();

    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase() === refName || contact.phone === refphone
    );
    return Boolean(dublicate);
  };

  const onAddContact = ({ name, phone }) => {
    if (isDublicate({ name, phone })) {
      return alert(`${name} or ${phone} is already in contacts.`);
    }
    dispatch(addContact({ name, phone }));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={InputSchema}
      onSubmit={(values, { resetForm }) => {
        onAddContact({ ...values });
        resetForm();
      }}
    >
      <Form>
        <Label>
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <ErrorMessage name="name" component="div" />

        <Label>
          Number
          <Field
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <ErrorMessage name="phone" component="div" />
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
