import { useEffect, useState, type FunctionComponent } from "react";
import { handleFetchData, handleLoadLocalFiles } from "../api/data";
import { useData } from '../hooks/usePlotData'
import { useDataFiles} from "../store/dataStore";
import DataSelection from "../components/dataselection";
import { createView } from "../data/duckdb/create/views";
import DataTable from "../components/table";
import { getTablePreview } from "../data/duckdb/query/query";


 
const MainView: FunctionComponent = () => {
    const [count, setCount] = useState(0)
    const { data, isLoading, error, isSuccess } = useData(["spar2.parquet", "spar1.parquet", "test.parquet"])
    const [dataPreview, setDataPreview] = useState([])
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

    const handlePreviewData = async (tableName: string)=>{
        const rows = await getTablePreview(tableName)
        setDataPreview(rows)
        console.log("ROWS",  rows)
    }
    // const [tables, addTable, removeTable] = useDataFiles((state)=> [state.tables, state.addTable, state.removeTable])
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{`Error encountered while loading::: ${error}`}</div>
    // addTable(data!)
    console.log("DATA:::", data)
    console.log("TABLES:::", tables)
    return ( <>
        <div className="card">
            {
            Object.entries(tables).map(([tableName, tableInfo], index)=><DataSelection key={index} table={tableInfo} preview={()=>{handlePreviewData(tableName)}} removeTable={removeTable}></DataSelection>)
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
            <button onClick={async ()=>{
                const viewName = 'joinedOnFname'
                const tnames = Object.keys(tables).map(key=>key)
                const view = await createView([tnames[0], tnames[1]], ['fileName'], viewName)
                addTable(view!)
                handlePreviewData(viewName)
            }}>
                Create New View
            </button>
            <input type="file" accept=".parquet, .csv" onChange={(e)=>{handleLoadLocalFiles(e.target.files!)}}/>
            {  !!dataPreview &&
                <DataTable rows={dataPreview}/>
            }
        </div>
    </> );
}
 
export default MainView;