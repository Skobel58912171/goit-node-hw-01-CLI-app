const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      console.table(JSON.parse(data));
    })
    .catch(console.error);
}

function getContactById(id) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((contact) => contact.id === id);
      console.log(contact);
      return contact;
    })
    .catch(console.error);
}

function removeContact(id) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const updateContacts = contacts.filter((contact) => contact.id !== id);

      return JSON.stringify(updateContacts);
    })
    .then((data) => {
      fs.writeFile(contactsPath, data);
      console.table(JSON.parse(data));
    })
    .catch(console.error);
}

function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(11),
    name,
    email,
    phone,
  };
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const updateContacts = [...contacts, newContact];
      console.log(newContact);

      return JSON.stringify(updateContacts);
    })
    .then((data) => {
      fs.writeFile(contactsPath, data);
      console.table(JSON.parse(data));
    })
    .catch(console.error);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
