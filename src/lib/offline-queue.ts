export type OfflineRecordType =
  | "ATTENDANCE"
  | "LEARNING_ATTEMPT"
  | "GROWMEAL_OBSERVATION"
  | "FOOD_DISCOVERY"
  | "PROGRESS_ASSESSMENT";

export type OfflineQueueItem = {
  id: string;
  type: OfflineRecordType;
  payload: Record<string, unknown>;
  createdAt: string;
  attempts: number;
  lastError?: string;
};

const DB_NAME = "lifews-pathways-offline";
const DB_VERSION = 1;
const STORE = "queue";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Unable to open offline database"));
  });
}

export async function enqueueOfflineRecord(
  type: OfflineRecordType,
  payload: Record<string, unknown>,
): Promise<OfflineQueueItem> {
  const item: OfflineQueueItem = {
    id: crypto.randomUUID(),
    type,
    payload,
    createdAt: new Date().toISOString(),
    attempts: 0,
  };
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Unable to queue offline record"));
  });
  db.close();
  return item;
}

export async function listOfflineRecords(): Promise<OfflineQueueItem[]> {
  const db = await openDb();
  const records = await new Promise<OfflineQueueItem[]>((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    request.onsuccess = () => resolve((request.result ?? []) as OfflineQueueItem[]);
    request.onerror = () => reject(request.error ?? new Error("Unable to read offline queue"));
  });
  db.close();
  return records.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function removeOfflineRecord(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Unable to remove offline record"));
  });
  db.close();
}

export async function updateOfflineRecord(item: OfflineQueueItem): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("Unable to update offline record"));
  });
  db.close();
}
