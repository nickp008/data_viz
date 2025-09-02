import { ddb } from "../ddb";

  export async function queryColumnData(colName: string){
    const conn = await ddb.connect()
    const res = await (await conn.query(`SELECT ${colName} from direct limit 100`)).toArray()
    for (const row of res) {
      console.log('val:', row.Col1, 'value:', row.value);
      // console.log("ROW:", {...row})
    }
    
  }

