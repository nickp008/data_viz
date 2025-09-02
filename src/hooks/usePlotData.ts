import { useQuery } from "@tanstack/react-query"
import { handleFetchData } from "../api/data"
import { useEffect } from "react"
import { useDataFiles } from "../store/dataStore"




export function useData(fileID: string) {
    const query =  useQuery({
        queryKey: ["fileID", fileID],
        queryFn: ({queryKey}) => handleFetchData(queryKey[1]),
    })
    return query
}