export function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("bigDataDB", 2);
        request.onupgradeneeded = function(event: IDBVersionChangeEvent) {
            const db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore("secureStore", {keyPath: 'id'})
        }
        
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.result)

    })
    
}