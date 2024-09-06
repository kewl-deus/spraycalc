import {Slider} from "primereact/slider";
import {Button} from "primereact/button";
import {VolumeArea} from "../../types";
import {formatNumber} from "../../utils.ts";

export interface VolumeAreaSliderProps {
    label: string;
    data: VolumeArea;
    minVolume?: number;
    maxVolume?: number;
    disabled?: boolean;
    onChange: (value: VolumeArea) => void;
}


export default function VolumeAreaSlider(props: VolumeAreaSliderProps) {

    function addVolume(volume: number) {
        props.onChange({...props.data, volume: props.data.volume + volume})
    }

    return (
        <>
            <div className="mt-1">{props.label}: {formatNumber(props.data.volume, "l")} &rarr; {formatNumber(props.data.area, "ha")}</div>

            <div className="flex align-items-center mb-1">
                <div className="flex-grow-1 mr-3">
                    <Slider
                        value={props.data.volume}
                        min={props.minVolume || 0}
                        max={props.maxVolume || 100}
                        onChange={(e) => {
                            props.onChange({...props.data, volume: e.value as number});
                        }}
                        className="ml-1 w-full"
                        disabled={props.disabled || false}
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
                    disabled={props.disabled}
                />
                <Button
                    icon="pi pi-plus"
                    severity="success"
                    className="mr-1 small"
                    size="small"
                    onClick={() => {
                        addVolume(1);
                    }}
                    disabled={props.disabled}
                />
            </div>
        </>
    )
}