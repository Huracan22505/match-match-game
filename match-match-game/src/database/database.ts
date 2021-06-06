// const resData: Array<unknown> = [];
// let db!: IDBDatabase;

// const getWrite = () =>
//   new Promise(resolve => {
//     let tx: IDBTransaction | null = null;
//     tx = db.transaction('persons', 'readonly');
//     const store = tx.objectStore('persons');
//     const result = store.index('score').openCursor(null, 'prev');
//     result.onsuccess = () => {
//       const cursor = result.result;
//       if (cursor) {
//         resolve(resData.push(cursor?.value));
//       }
//       cursor?.continue();
//     };
//     tx.oncomplete = () => {
//       resolve(resData);
//     };
//   });

// const createDb = (dbName: string, version?: number): void => {
//   const iDB = window.indexedDB;
//   const dbReq: IDBOpenDBRequest = iDB.open(dbName, version);

//   dbReq.onupgradeneeded = () => {
//     const database = dbReq.result;
//     const store = database.createObjectStore('persons', {
//       keyPath: 'email',
//       autoIncrement: true,
//     });
//     store.createIndex('email', 'email', { unique: true });
//     store.createIndex('score', 'score', { unique: false });
//     db = database;
//   };

//   dbReq.onsuccess = () => {
//     db = dbReq.result;
//     getWrite();
//   };

//   dbReq.onerror = () => {
//     alert(`error opening database ${dbReq.result}`);
//   };
// };

// const addPersons = (player: {
//   firstName: string;
//   lastName: string;
//   email: string;
//   // imagesLoad: string;
//   score: unknown;
// }) => {
//   const tx = db.transaction(['persons'], 'readwrite');
//   const store = tx.objectStore('persons');
//   const note = player;
//   store.put(note);
// };
