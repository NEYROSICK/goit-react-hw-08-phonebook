import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import ErrorMsg from 'components/ErrorMsg';
import Filter from 'components/Filter';
import Section from 'components/Section';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getContacts, getContactsError, getIsLoading } from 'redux/selectors';
import cl from 'components/ContactList/contactList.module.css';
import UserMenu from 'components/UserMenu';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <UserMenu />

      <Section title="Phonebook" variant="phonebook">
        <ContactForm />
      </Section>

      <Section title="Contacts" variant="contacts">
        <Filter />

        {isLoading && <></>}

        {error && <ErrorMsg />}

        {contacts.length > 0 && <ContactList />}

        {!contacts.length && !error && (
          <p className={cl.emptyMessage}>
            Complete Emptiness {':('}
            <br /> Try to add some contacts to your phonebook
          </p>
        )}
      </Section>
    </>
  );
};

export default ContactsPage;
