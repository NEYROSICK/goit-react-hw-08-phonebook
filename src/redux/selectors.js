import { createSelector } from '@reduxjs/toolkit';

export const getIsLoading = state => state.contacts.isLoading;
export const getContactsError = state => state.contacts.error;

export const getContacts = state => state.contacts.items;
export const getFilter = state => state.filter;

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getIsRefreshing = state => state.auth.isRefreshing;
export const getUserEmail = state => state.auth.user.email;
export const getErrorReg = state => state.auth.errorReg;
export const getErrorLog = state => state.auth.errorLog;

export const getfilteredContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const containsNumbers = inputString => {
      const regex = /\d/;
      return regex.test(inputString);
    };

    const containsOnlyNumbersRelated = inputString => {
      const regex = /^[\d()\-\s]+$/;
      return regex.test(inputString);
    };

    const containsOnlyNumbers = inputString => {
      const regex = /^\d+$/;
      return regex.test(inputString);
    };

    if (containsOnlyNumbersRelated(filter)) {
      const filteredList = contacts.filter(contact => {
        const temp =
          contact.number
            .split('')
            .filter(digit => {
              return containsOnlyNumbers(digit);
            })
            .join('')
            .includes(filter) ||
          contact.number
            .split(' ')
            .filter(num => num !== '')
            .join('')
            .includes(
              filter
                .split(' ')
                .filter(num => num !== '')
                .join('')
            );
        return temp;
      });
      return filteredList;
    } else if (containsNumbers(filter)) {
      return [];
    } else {
      const filteredList = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
      });
      return filteredList;
    }
  }
);

export const getCheckedContactName = name =>
  createSelector([getContacts], contacts => {
    return contacts.find(contact => {
      return (
        contact.name.trim().toLowerCase() ===
        name
          .trim()
          .split(' ')
          .filter(word => word !== '')
          .join(' ')
          .toLowerCase()
      );
    });
  });

export const getCheckedContactNumber = number =>
  createSelector([getContacts], contacts => {
    return contacts.find(contact => {
      return (
        contact.number
          .trim()
          .split(' ')
          .filter(num => num !== '')
          .join('') ===
        number
          .trim()
          .split(' ')
          .filter(num => num !== '')
          .join('')
      );
    });
  });
