import {Slider} from "primereact/slider";
import {ButtonGroup} from "primereact/buttongroup";
import {Button} from "primereact/button";
import {VolumeArea} from "../../types";

export interface VolumeAreaSliderProps {
    label: string;
    data: VolumeArea;
    minVolume: number;
    maxVolume: number;
    onChange: (value: VolumeArea) => void;
}


export default function VolumeAreaSlider(props: VolumeAreaSliderProps) {

    function addVolume(volume: number) {
        props.onChange({...props.data, volume: props.data.volume + volume})
    }

    return (
        <>
            <div>{props.label}: {props.data.volume} l {"->"} {props.data.area} ha</div>

            <div className="flex align-items-center">
                <Slider value={props.data.volume}
                        min={props.minVolume}
                        max={props.maxVolume}
                        onChange={(e) => {
                            props.onChange({...props.data, volume: e.value as number})
                        }}
                        className="w-14rem mr-1"/>
                <ButtonGroup>
                    <Button icon="pi pi-minus" severity="danger" className="mr-1"
                            size="small"
                            onClick={() => {
                                addVolume(-1);
                            }}/>
                    <Button icon="pi pi-plus" severity="success" className="mr-1"
                            size="small"
                            onClick={() => {
                                addVolume(1);
                            }}/>
                </ButtonGroup>
            </div>
        </>
    )
}