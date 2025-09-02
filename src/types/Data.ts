export type DataTable = {
    tableName: string, 
    columns: string[],
    numRows: number,
}

export type Transformation = {
    join: string,
    agg: string[],
}

export type Data = {
    tables: {[key:string]: DataTable},
}

export type DataOptions = {
    addTable: (tableData: DataTable)=>void,
    removeTable: (tableName: string)=>void,

}