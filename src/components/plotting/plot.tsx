import type { GridProps, LineProps } from "../../interfaces/plots"
import React from 'react'
import { usePlotConfig } from "../../store/plotStore"
import { useShallow } from "zustand/shallow"


function Grid({ticksX, ticksY, offsX, offsY, plotWidth, plotHeight}: GridProps){
    const lines = []
    const color = 'rgb(100,100,100)'
    const width = '0.1'
    const style = '1 1'
    
    for (let i=1; i<ticksX; i++) {
        lines.push(<line x1={(plotWidth/ticksX)*i} x2={(plotWidth/ticksX)*i} y1={0} y2={plotHeight} stroke={color} strokeDasharray={style} strokeWidth={width}/>)
    }
    for (let i=1; i<ticksY; i++) {
        lines.push(<line y1={(plotHeight/ticksY)*i} y2={(plotHeight/ticksY)*i} x1={0} x2={plotWidth} stroke={color} strokeDasharray={style} strokeWidth={width}/>)
    }
    return <>{lines}</>
}

interface TickProps {
    numTicks: number,
    tickLabels?: string[]
    offsX?: number,
    offsY?: number,
    
}

function Xticks ({numTicks, minVal}: TickProps) {
    
}

export function Line({dataX, dataY, scalerX, scalerY, minX, minY, maxX, maxY}: LineProps){
    console.log(dataX, dataY)
    if (dataX.length === 0) {
        return <></>
    }
    if(dataX.length !== dataY.length) {
        throw "X and Y data vectors must be same length"
    }
    // const start = `M${scalerX(dataX[0]!)} ${scalerY(dataY[0]!)} `
    const pathSegments = dataX.map((value, index)=>`${index===0? 'M' : 'L'}${scalerX(value, minX, maxX)} ${scalerY(dataY[index], minY, maxY)} `)
    const pathText = pathSegments.join('')//+'Z'
    console.log("PATH TEXT:::", pathText)
    return <path d={pathText} fill="none" stroke="rgb(0, 92, 132)" strokeWidth={0.5}/>
}
Line.displayName = "Line"

interface TraceProps {
    traceType: string,
    dataX: number[],
    dataY: number[]

}
interface PlotProps {
    data: {[key:string]: string}[]
    children: React.ReactNode
    width: number
    height: number

}

export function Trace({traceType, dataX, dataY}: TraceProps) {
    switch (traceType) {
        case "line": 
    }
}

export function MyPlot() {
    const {title, xAxes, yAxes, updateTitle} = usePlotConfig(
        useShallow((state) => ({title: state.title, xAxes: state.xAxes, yAxes: state.yAxes, updateTitle: state.setTitle}))
    )
    console.log("HERE IS MY STATE OBJECT...", title, xAxes, yAxes, updateTitle)
    updateTitle("MY NEW TITLE")
    return <div>

    </div>
}

export default function Plot({data, width, height, children}: PlotProps) {
    const minX =  0
    const maxX =  0
    const minY =  0
    const maxY =  0
    // const maxX =  Math.max(...dataX)
    // const minY =  Math.min(...dataY)
    // const maxY =  Math.max(...dataY)
    const plotHeight = 100;
    const plotWidth = 140
    const scalerX = (val: number, minVal: number, maxVal: number) => plotWidth*((val - minVal) / (maxVal - minVal));
    const scalerY = (val: number, minVal: number, maxVal: number) => plotHeight - plotHeight*((val - minVal) / (maxVal - minVal));
    
    for (const child of children){
        console.log("==================================")
        console.log("CHILD:::", child)
        console.log("CHILD PROPS:::", child.props)
        console.log("CHILD TYPE:::", child.type)
        console.log("CHILD TYPE:::", Line)
        console.log("CHILD TYPE:::", child.type===Line)
        console.log("==================================")
    }
    return (<div id='plotdiv' style={{width: '600px', backgroundColor:'rgb(240,240,240)'}}>
            <svg viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
                <Grid ticksX={10} ticksY={10} plotWidth={plotWidth} plotHeight={plotHeight}/>
                {/* <Line dataX={dataX} dataY={dataY} scalerX={scalerX} scalerY={scalerY} minX={minX} minY={minY} maxX={maxX} maxY={maxY}/> */}
                {children}
                {/* <Xticks numTicks={10} ></Xticks> */}
                {/* <Line dataX={[25, 45]} dataY={[55, 65]}/> */}
            </svg>
        </div>)
   
}