import { getColumns } from "../../../api/data";
import { ddb } from "../ddb";

export async function createView(tables: string[], joinKeys:string[], viewName: string) {
    const conn = await ddb.connect()
    let query = `CREATE OR REPLACE VIEW ${viewName} AS
        SELECT * FROM ${tables[0]} `
    for (let i = 1; i < tables.length; i++) {
        query += `INNER JOIN ${tables[i]} USING(${joinKeys[0]}) `;
    await conn.query(query);
    const columns = await getColumns(conn, viewName)
    await conn.close();
    return {tableName: viewName, columns: columns, numRows: 10}
  }
}