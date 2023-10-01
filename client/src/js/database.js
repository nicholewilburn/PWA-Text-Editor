import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Initialize the database when the module is imported
initdb();

// Function to add content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  // Use a transaction to perform the database operation
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Define the data to be inserted
  const data = { content, timestamp: Date.now() };

  // Add the data to the object store
  await store.add(data);

  // Complete the transaction
  await tx.done;
};

// Function to get all content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);

  // Use a transaction to perform the database operation
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve all records from the object store
  const content = await store.getAll();

  // Complete the transaction
  await tx.done;

  return content;
};