import { create } from "zustand";
import type { PlotConfig, PlotState } from "../types/Plots";
import type { Data, DataOptions, DataTable } from "../types/Data";


export const usePlotConfig = create<PlotConfig & PlotState>((set) => ({
    title: '',
    xAxes: [],
    yAxes: [],
    setTitle: (newTitle: string) => set((state) => ({...state, title: newTitle})),
    // addAxis: (loc: string) => void,
    // addTrace: (data: Trace) => void,
    // removeTrace: (index: number) => void,
}))


export const useDataFiles = create<Data & DataOptions>((set) => ({
    tables: {},
    // addTable: (tableData: DataTable) => set((state) => ({...state, [tableData.tableName]: tableData})),
    addTable: (tableData: DataTable) => set((state) => ({ tables: {...state.tables, [tableData.tableName]: tableData}})),
    removeTable: (tableName: string) => set((state) => {
        const newTables = {...state.tables};
        delete newTables[tableName];
        return { tables: newTables};
    }),
}))