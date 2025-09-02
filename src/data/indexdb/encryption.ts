export async function generateKey(): Promise<CryptoKey> {
    return crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 256,
        },
        true,
        ['encrypt', 'decrypt']
    )
}

export async function encryptData(data: Uint8Array, key: CryptoKey): Promise<ArrayBuffer> {
    // const encodedData = new TextEncoder().encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key, 
        data
    );
    return encrypted;
}

export async function decryptData(encryptedData: ArrayBuffer, key: CryptoKey): Promise<string> {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key, 
        encryptedData
    );
    return new TextDecoder().decode(decrypted);
}