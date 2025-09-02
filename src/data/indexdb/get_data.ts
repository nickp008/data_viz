import { decryptData } from "./encryption";

export async function getDecryptedData(db: IDBDatabase, id: string, key: CryptoKey) {
    const transaction = db.transaction("secureStore", "readonly");
    const store = transaction.objectStore("secureStore");
    const request = store.get(id);

    request.onsuccess = async () => {
        if (request.result) {
            const decryptedData = await decryptData(request.result.encryptedData, key);
            console.log("Decrypted Data:", decryptedData);
        }
        else {
            console.log("No data found");
        }
    }
}

export function parseData(data: Uint8Array) {
    const decoder = new TextDecoder('utf-8')
    const textData = btoa(decoder.decode(data))
    return textData
}