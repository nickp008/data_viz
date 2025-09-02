export interface LineProps  {
    dataX: number[],
    dataY: number[],
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    scalerX: Function,
    scalerY: Function,
}

export interface GridProps {
    ticksX: number,
    ticksY: number,
    offsX?: number,
    offsY?: number,
    plotWidth: number,
    plotHeight: number,
}
export interface AxisProps {
    labels: string[]
    ticksX: number,
    ticksY: number,
    offsX?: number,
    offsY?: number,
    plotWidth: number,
    plotHeight: number,
}

export interface PlotProps {
    type: string
    lineProps: LineProps
    gridProps: GridProps
    axisProps: AxisProps

}