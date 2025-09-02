import type { FunctionComponent } from "react";
import type { DataTable } from "../types/Data";

interface DataSelectionProps {
    table: DataTable
    removeTable: (tableName: string) => void
}
 
const DataSelection: FunctionComponent<DataSelectionProps> = ({table, removeTable}) => {
    return ( <>
        <div> HERE IS A TABLE </div>
        <div>{table.tableName}</div>
        {table.columns.map((colName: string, index: number)=><div key={index}>{colName}</div>)}
        <button onClick={()=>{removeTable(table.tableName)}}>X</button>
    </> );
}
 
export default DataSelection;