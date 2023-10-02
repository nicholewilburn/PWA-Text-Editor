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

// Function to put content into the database with a specific id (1)
export const putDb = async (content) => {
  const db = await openDB('jate', 1);

  // Use a transaction to perform the database operation
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Define the data to be inserted/updated
  const data = { id: 1, content, timestamp: Date.now() };

  // Use put to update or insert the data
  await store.put(data);

  // No need to complete the transaction explicitly
};

// Function to get content from the database by id (1)
export const getDb = async () => {
  const db = await openDB('jate', 1);

  // Use a transaction to perform the database operation
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve the record with id 1
  const content = await store.get(1);

  // No need to complete the transaction explicitly

  return content;
};