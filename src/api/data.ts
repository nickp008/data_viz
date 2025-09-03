import type { DuckDBConnection } from '@duckdb/duckdb-wasm/blocking'
import { ddb } from '../data/duckdb/ddb'
import type { DataTable } from '../types/Data'
import type { AsyncDuckDBConnection } from '@duckdb/duckdb-wasm'
const url = "http://localhost:5000/data"
const DATA_FORMATS = ['parquet', 'csv']

export const api = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Network error")
  return res.json()
}

export function parseData(data: Uint8Array) {
    const decoder = new TextDecoder('utf-8')
    const textData = btoa(decoder.decode(data))
    return textData
}

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


export async function fetchDataFile(fileId: string) {
    console.log(`Fetching data by fileId: ${fileId}`)
    const response = await fetch(`${url}?file=${fileId}`)
    const bytes = await response.arrayBuffer()
    return bytes
}
// export async function fetchData(url: string) {
//     console.log("Fetching data non-streaming...")
//     // const decoder = new TextDecoder('utf-8')
//     const response = await fetch(url)
//     const data = await response.arrayBuffer()
//     // const data = await response.bytes()
//     // const utf8Bytes = new Uint8Array(data.size);
//     // for (let i = 0; i < data.size; i++) {
//     //     utf8Bytes[i] = ;
//     // }
//     // console.log("DATA:::", data)
//     // console.log(decoder.decode(utf8Bytes))
//     return data
// }


// export async function handleFetchDataStream(url: string) {
// console.log("ABOUT TO HANDLE FETCH DATA STREAM")
// const data: Uint8Array[] =  []
// for await (const chunk of fetchDataStream(url)) {
//     data.push(chunk)
// }
// const totalLength = data.reduce((sum, arr)=> sum+arr.length, 0);
// const result = new Uint8Array(totalLength);
// let offset = 0
// for (const arr of data){
//     result.set(arr, offset);
//     offset += arr.length
// }

// return parseData(result)
// // storeEncryptedData(db, id, result, key)
// }
export async function handleFetchDataFiles(fileIds: string[]){
  const promises = []
  for (const fileId of fileIds) {
    promises.push(handleFetchData(fileId))
  }
  const result = await Promise.all(promises)
  return result
}

export async function getColumns(conn: AsyncDuckDBConnection, tableName: string) {
const table_info = await conn.query(`PRAGMA table_info('${tableName}')`);
  // console.table("TABLE INFO", info.schema.fields.join(","));
  console.log("HERE IS THE RESULT!")
  console.log("SCHEMA NAMES", table_info.schema.names)
  // setColNames(table_info.schema.)
  const _colNames = []
  for (const col of table_info.select(['name'])) {
      console.log(col.name)
      _colNames.push(col.name)
  }
  console.log("COL NAMES!!!", _colNames)
  return _colNames
}

export async function handleFetchData(fileId: string): Promise<DataTable> {
  const [ fileName, extension ] = fileId.split('.')

  if (!DATA_FORMATS.includes(extension)) throw "Error, invalid data type";
  console.log("FILE ID:::", fileId)
  const data = await fetchDataFile(fileId)
  const arr = new Uint8Array(data)
  ddb.registerFileBuffer(`dobis`, arr)
  const conn = await ddb.connect()
  console.log("REgistered??")
  // try {
    conn.query(`CREATE OR REPLACE TABLE ${fileName} AS 
      SELECT * FROM parquet_scan('dobis')`)
    // } catch {
      // conn.query(`DROP TABLE ${fileName}`)
      // conn.query(`CREATE TABLE dobis AS 
        // SELECT * FROM parquet_scan('dobis')`)
    // }
    // queryColumnData('Col1')
  console.log("ALready added table...")
  const _colNames = await getColumns(conn, fileName)
  return {tableName: fileName, columns: _colNames, numRows: 10}
}