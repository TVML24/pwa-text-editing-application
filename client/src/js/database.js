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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  // Create the transaction 
  // designate the database and what permissions it has
  const tx = jateDb.transaction('jate', 'readwrite');
  // Access the store (it's like a collection)
  const store = tx.objectStore('jate');
  // Use the .put method to update the desired content
  const request = store.put({ id: 1, value: content } );
  const result = await request;
  console.log('result.value', result);
  return result;
};



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // uses the getall method to grab all content form the db
  const request = store.getAll();
  const result = await request;
  console.log(result);
}

initdb();
