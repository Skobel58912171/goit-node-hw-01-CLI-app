const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

function listContacts() {
  return readContacts();
}

async function getContactById(id) {
  try {
    const contacts = await readContacts();

    const contact = contacts.find((contact) => contact.id === id);

    return contact;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(id) {
  try {
    const contacts = await readContacts();

    const filteredContacts = contacts.filter((contact) => contact.id !== id);

    await updateContacts(filteredContacts);

    return filteredContacts;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(11),
    name,
    email,
    phone,
  };

  try {
    const contacts = await readContacts();

    contacts.push(newContact);

    await updateContacts(contacts);

    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
