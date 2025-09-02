export async function*     fetchDataStream(url: string) {
    console.log("Awaiting fetch...")
    const response = await fetch(url)
    console.log("Got initial response", response.headers.get('Content-Length'))
    if (!response.body) {
        throw new Error("ReadableStream not supported in this environment");
    }
    const reader = response.body.getReader();
    // const decoder = new TextDecoder();
    while (true) {
        console.log("GETTING CHUNK")
        const { done, value } = await reader.read();
        if (done) {console.log("Streaming complete"); break;};
        // const chunk = decoder.decode(value, { stream: true });
        // const chunk = value
        yield value;
    }    
}


export async function fetchParquet(url: string) {
    console.log("Fetching parquet data non-streaming...")
    const response = await fetch(url)
    const parquetBytes = await response.arrayBuffer()
    console.log("LENGTH OF ARRAY BUFFER IN FETCH:::", parquetBytes.byteLength)
    return parquetBytes
}
export async function fetchData(url: string) {
    console.log("Fetching data non-streaming...")
    const decoder = new TextDecoder('utf-8')
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    // const data = await response.bytes()
    const utf8Bytes = new Uint8Array(data.size);
    // for (let i = 0; i < data.size; i++) {
    //     utf8Bytes[i] = ;
    // }
    console.log("DATA:::", data)
    // console.log(decoder.decode(utf8Bytes))
    return data
}
