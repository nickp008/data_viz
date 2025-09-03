import { useQuery } from "@tanstack/react-query"
import { handleFetchData, handleFetchDataFiles } from "../api/data"
import { useEffect } from "react"
import { useDataFiles } from "../store/dataStore"




export function useData(fileIDs: string[]) {
    const query =  useQuery({
        queryKey: ["fileID", fileIDs],
        queryFn: ({queryKey}) => handleFetchDataFiles(queryKey[1] as string[]),
    })
    return query
}