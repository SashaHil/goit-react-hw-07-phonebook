import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  return (
    <Layout>
      <Section title="Phonebook"></Section>
      <ContactForm />

      <Section title="Contacts"></Section>
      <Filter />
      <ContactList />
    </Layout>
  );
};
