import { useEffect, useState, type FunctionComponent } from "react";
import { handleFetchData, handleLoadLocalFiles } from "../api/data";
import { useData } from '../hooks/usePlotData'
import { useDataFiles} from "../store/dataStore";
import DataSelection from "../components/dataselection";
import { createView } from "../data/duckdb/create/views";


 
const MainView: FunctionComponent = () => {
    const [count, setCount] = useState(0)
    const { data, isLoading, error, isSuccess } = useData(["spar2.parquet", "spar1.parquet", "test.parquet"])
    // const [dataFileInfo, addDataFile, removeDatafile] = usePlotConfig((state)=>[state.title, state.])
    const tables = useDataFiles((state)=>state.tables)
    const addTable = useDataFiles((state)=>state.addTable)
    const removeTable = useDataFiles((state)=>state.removeTable)

    useEffect(()=>{
        if (isSuccess && data) {
            console.log("ADDING TABLE TO STORE...")
            for (const table of data) {
                addTable(table)
            }
        }
    },[isSuccess, data, addTable])
    // const [tables, addTable, removeTable] = useDataFiles((state)=> [state.tables, state.addTable, state.removeTable])
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{`Error encountered while loading::: ${error}`}</div>
    // addTable(data!)
    console.log("DATA:::", data)
    console.log("TABLES:::", tables)
    return ( <>
        <div className="card">
            {
                // tables && <div>Here is my table info...</div>
            Object.entries(tables).map(([tableName, tableInfo], index)=><DataSelection key={index} table={tableInfo} removeTable={removeTable}></DataSelection>)
            }
            <button onClick={()=>{
            handleFetchData("test.parquet")
            }}>
            
            Click to stream data.
            </button>
            <button onClick={async ()=>{
                const view = await createView(['spar1', 'spar2'], ['fileName'], 'JoinedVIEW')
                console.log("HERES MY VIEW:::", view)
                addTable(view!)
            }}>
                Add table info to store...
            </button>
            <button onClick={()=>{
                setCount(count+1)
            }}>
                Force re-render...
            </button>
            <input type="file" accept=".parquet, .csv" onChange={(e)=>{handleLoadLocalFiles(e.target.files!)}}/>
        </div>
    </> );
}
 
export default MainView;