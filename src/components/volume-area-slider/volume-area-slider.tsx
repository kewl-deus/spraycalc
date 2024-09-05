import {Slider} from "primereact/slider";
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
            <div className="mt-1">{props.label}: {props.data.volume} l &rarr; {props.data.area} ha</div>

            <div className="flex align-items-center mb-1">
                <div className="flex-grow-1 mr-3">
                    <Slider
                        value={props.data.volume}
                        min={props.minVolume}
                        max={props.maxVolume}
                        onChange={(e) => {
                            props.onChange({...props.data, volume: e.value as number});
                        }}
                        className="ml-1 w-full"
                    />
                </div>
                <Button
                    icon="pi pi-minus"
                    severity="danger"
                    className="mr-1 small"
                    size="small"
                    onClick={() => {
                        addVolume(-1);
                    }}
                />
                <Button
                    icon="pi pi-plus"
                    severity="success"
                    className="mr-1 small"
                    size="small"
                    onClick={() => {
                        addVolume(1);
                    }}
                />
            </div>
        </>
    )
}