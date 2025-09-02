import { useState, type FunctionComponent } from "react";
import Plot from "./plotting/plot";
import type { PlotProps } from "../interfaces/plots";

interface PlotsContainerProps {
    plots: PlotProps[]
}
 
const PlotsContainer: FunctionComponent<PlotsContainerProps> = ({plots}: PlotsContainerProps) => {
    const [plotConfigs, setPlotConfigs] = useState<PlotProps[]>(plots)
    return ( <>
        {plotConfigs.map((plotProps, index)=><Plot key={index} {...plotProps}></Plot>)}
    </> );
}
 
export default PlotsContainer;