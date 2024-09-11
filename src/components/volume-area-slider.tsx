import {Slider, SliderChangeEvent} from "primereact/slider";
import {Button} from "primereact/button";
import {formatNumber} from "../utils.ts";
import {calcArea} from "../calculation-logic.ts";

export interface VolumeAreaSliderProps {
    label: string;
    volume: number;
    sprayDosage: number;
    minVolume?: number;
    maxVolume?: number;
    stepSize?: number;
    disabled?: boolean;
    onChange: (value: number) => void;
}

export default function VolumeAreaSlider(props: VolumeAreaSliderProps) {

    const stepSize = props.stepSize || 25;
    const minVolume = props.minVolume || 0;
    const maxVolume = props.maxVolume || 100;

    function addVolume(volume: number) {
        const newVolume = props.volume + volume;
        if (newVolume > minVolume && newVolume < maxVolume){
            props.onChange(newVolume)
        }

    }

    return (
        <>
            <div className="mt-1">{props.label}: {props.volume + " l"} &rarr; {formatNumber(calcArea(props.volume, props.sprayDosage), "ha")}</div>

            <div className="flex align-items-center mb-1">
                <div className="flex-grow-1 mr-4">
                    <Slider
                        value={props.volume}
                        min={minVolume}
                        max={maxVolume}
                        step={stepSize}
                        onChange={(e: SliderChangeEvent) => {
                            props.onChange(e.value as number);
                        }}
                        className="w-full"
                        disabled={props.disabled || false}
                    />
                </div>
                <Button
                    icon="pi pi-minus"
                    severity="danger"
                    className="small"
                    size="small"
                    onClick={() => {
                        addVolume(-stepSize);
                    }}
                    disabled={props.disabled}
                />
                <Button
                    icon="pi pi-plus"
                    severity="success"
                    className="small"
                    size="small"
                    onClick={() => {
                        addVolume(stepSize);
                    }}
                    disabled={props.disabled}
                />
            </div>
        </>
    )
}