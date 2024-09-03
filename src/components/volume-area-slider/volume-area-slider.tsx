import {Slider} from "primereact/slider";
import {ButtonGroup} from "primereact/buttongroup";
import {Button} from "primereact/button";
import {VolumeArea} from "../../types";

export interface VolumeAreaSliderProps {
    label: string;
    data: VolumeArea;
    onChange: (value: VolumeArea) => void;
}


export default function VolumeAreaSlider(props: VolumeAreaSliderProps) {

    return (
        <>
            <div>{props.label}: {props.data.volume} l {"->"} {props.data.area} ha</div>
            <Slider value={props.data.volume} onChange={(e) => {
                props.onChange({...props.data, volume: e.value as number})
            }} className="w-14rem"/>
            <ButtonGroup>
                <Button label="-" onClick={() => {
                    props.onChange({...props.data, volume: props.data.volume - 1})
                }}/>
                <Button label="+" onClick={() => {
                    props.onChange({...props.data, volume: props.data.volume + 1})
                }}/>
            </ButtonGroup>
        </>
    )
}