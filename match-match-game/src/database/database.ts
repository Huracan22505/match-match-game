const usersData: Array<{
  name: string;
  lastName: string;
  email: string;
  score: string | null;
  avatar: string | null;
}> = [];
let db: IDBDatabase;

const getFormData = () => {
  const nameField = <HTMLInputElement>document.getElementById('name');
  const lastNameField = <HTMLInputElement>document.getElementById('lastName');
  const emailField = <HTMLInputElement>document.getElementById('email');

  const score: string | null = localStorage.getItem('score');
  const avatar: string | null = localStorage.getItem('avatar');
  const formData = {
    name: nameField.value,
    lastName: lastNameField.value,
    email: emailField.value,
    score,
    avatar,
  };

  localStorage.removeItem('avatar');

  return formData;
};

const getData = (): Promise<unknown> =>
  new Promise(resolve => {
    let tx: IDBTransaction | null = null;
    tx = db.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const result = store.index('score').openCursor(null, 'prev');

    result.onsuccess = () => {
      const cursor = result.result;
      if (cursor) {
        resolve(usersData.push(cursor?.value));
      }
      cursor?.continue();
    };

    tx.oncomplete = () => {
      resolve(usersData);
    };
  });

const addUser = (player: {
  name: string;
  lastName: string;
  email: string;
  score: string | null;
  avatar: string | null;
}): void => {
  const tx = db.transaction(['users'], 'readwrite');
  const store = tx.objectStore('users');
  const note = player;

  store.put(note);
  getData();
};

const postData = (): Promise<unknown> =>
  new Promise(() => {
    const data = getFormData();
    addUser(data);
  });

const createDataBase = (dbName: string, version?: number): void => {
  const iDB = window.indexedDB;
  const dbReq: IDBOpenDBRequest = iDB.open(dbName, version);

  dbReq.onupgradeneeded = () => {
    const database = dbReq.result;
    const store = database.createObjectStore('users', {
      keyPath: 'email',
      autoIncrement: true,
    });
    store.createIndex('email', 'email', { unique: true });
    store.createIndex('score', 'score', { unique: false });
    db = database;
  };

  dbReq.onsuccess = () => {
    db = dbReq.result;
    getData();
  };

  dbReq.onerror = () => {
    throw Error(`error opening database ${dbReq.result}`);
  };
};

export { createDataBase, postData, usersData };
