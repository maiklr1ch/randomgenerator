
import {GeneratorSettings} from "./App.tsx";
import React from "react";

interface SettingsFormProps {
    settings: GeneratorSettings;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onChange1: React.ChangeEventHandler<HTMLInputElement>;
    onChange2: React.ChangeEventHandler<HTMLInputElement>;
    onChange3: React.ChangeEventHandler<HTMLInputElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const SettingsForm = (props: SettingsFormProps) => {
    return <div className="settings">
        <h3>settings</h3>
        <div className="settings-field">
            <label htmlFor="from">from:</label>
            <input
                autoComplete="off"
                type="number"
                name="from"
                step={10 ** -props.settings.fractionDigits}
                value={props.settings.from}
                onChange={props.onChange}
            />
        </div>
        <div className="settings-field">
            <label htmlFor="to">to:</label>
            <input
                autoComplete="off"
                type="number"
                name="to"
                step={10 ** -props.settings.fractionDigits}
                value={props.settings.to}
                onChange={props.onChange1}
            />
        </div>
        <div className="settings-field">
            <label htmlFor="count">count:</label>
            <input
                autoComplete="off"
                type="number"
                name="count"
                min={1}
                max={25000}
                value={props.settings.count}
                onChange={props.onChange2}
            />
        </div>
        <div className="settings-field">
            <label htmlFor="fractionDigits">fraction digits:</label>
            <input
                autoComplete="off"
                type="number"
                name="fractionDigits"
                min={0}
                max={10}
                value={props.settings.fractionDigits}
                onChange={props.onChange3}
            />
        </div>
        <button onClick={props.onClick}>to defaults</button>
    </div>;
}