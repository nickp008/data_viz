
export type Axis = {
    name?: string,
    unit?: string,

}

export type Trace = {
    xData: number[],
    yData: number[],
}

export type PlotConfig = {
    traces?: Trace[],
    title: string,
    xAxes: Axis[],
    yAxes: Axis[],
}

export type PlotState = {
    setTitle: (newTitle: string) => void,
    addAxis?: (loc: string) => void,
    addTrace?: (data: Trace) => void,
    removeTrace?: (index: number) => void,
}


