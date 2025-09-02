import { encryptData } from "./encryption";

export async function storeEncryptedData(db: IDBDatabase, id: string, data: Uint8Array, key: CryptoKey){
    // ID is key to the value of the data stored.
    const encryptedData = await encryptData(data, key);
    console.log("ENCRYPTED DATA:::", encryptData)
    const transaction = db.transaction("secureStore", "readwrite");
    const store = transaction.objectStore("secureStore");
    store.put({ id, encryptedData });
}