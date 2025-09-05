import type { FunctionComponent } from "react";

interface DataTableProps {
    rows: {[key: string]: string| number}[]
}
 
const DataTable: FunctionComponent<DataTableProps> = ({rows}) => {
    console.log("ROWS:::", rows)
    if (rows.length<1){
        return <></>
    }
    const cols = Object.keys(rows[0])
    return ( <>
    <div style={{width: '80vw', height: '500px', overflow: "auto", margin: 'auto', borderRadius: '5px', boxShadow: '0px 0px 3px 0px black'}}>

        <table>
            <tr>
                    { cols.map(val=><td>{val}</td>)}
            </tr>
            <tbody>
                { rows.map(row=><tr>
                    {Object.entries(row).map(([key, val], index)=><td key={index}>{val}</td>)}
                </tr>)}
            </tbody>
        </table>
    </div>
    </> );
}
 
export default DataTable;