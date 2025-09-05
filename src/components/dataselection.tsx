import { useState, type FunctionComponent } from "react";
import type { DataTable } from "../types/Data";

interface DataSelectionProps {
    table: DataTable
    preview: () => {[key: string]: string|number}[]
    removeTable: (tableName: string) => void
}
 
const DataSelection: FunctionComponent<DataSelectionProps> = ({table, preview, removeTable}) => {
    const [expanded, setExpanded] = useState(false)
    return ( <div onClick={()=>{preview()}} style={{ cursor: 'pointer', padding: '5px', borderRadius: '5px', margin: '5px', boxShadow: '0px 0px 4px 0px black', display: 'flex', flexDirection: 'row'}}>
        <div style={{flexGrow: 1}}>
            <h2 style={{display: 'flex', flexDirection: 'column'}}>{table.tableName}</h2>
            {  expanded &&
                <div style={{}}>
                    {table.columns.map((colName: string, index: number)=><div key={index}>{colName}</div>)}
                </div>
            }
        </div>
        <button style={{cursor: 'pointer', fontSize: '1.4em'}} onClick={(e)=>{e.preventDefault(); setExpanded(!expanded)}}>{expanded? `\u2191`:`\u2193`}</button>
        <button onClick={(e)=>{e.stopPropagation();removeTable(table.tableName)}}>X</button>
    </div> );
}
 
export default DataSelection;