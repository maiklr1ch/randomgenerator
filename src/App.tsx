import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HistoryList from "./HistoryList.tsx";
import {SettingsForm} from "./SettingsForm.tsx";

export type SettingsField = 'count' | 'from' | 'to' | 'fractionDigits'
export type GeneratorSettings = {
    [key in SettingsField]: number
}

const defaultSettings: GeneratorSettings = {
    count: 1,
    from: 0,
    to: 100,
    fractionDigits: 0
};

export interface HistoryRecord {
    current: number[] | number;
    total: number;
}

function App() {
  const [settings, setSettings] = useState<GeneratorSettings>(defaultSettings);
  const [newNumber, setNewNumber] = useState<number | number[]>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: SettingsField) => {
    setSettings(prevSettings => ({
        ...prevSettings,
        [field]: +event.target.value
    }));
  };

  const handleNewClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      let newNumber: number | number[];
      let toTotal = 0;
      if(settings.count > 1) {
          newNumber = new Array(settings.count);
          for(let i = 0; i < settings.count; i++) {
              newNumber[i] = +(settings.from + Math.random() * (settings.to - settings.from)).toFixed(settings.fractionDigits);
              toTotal += newNumber[i];
          }
      }
      else {
          newNumber = +(settings.from + Math.random() * (settings.to - settings.from)).toFixed(settings.fractionDigits);
          toTotal += newNumber;
      }

      const newRecord: HistoryRecord = {
          current: newNumber,
          total: +(toTotal + totalCount).toFixed(settings.fractionDigits)
      };
      setNewNumber(newNumber);
      setTotalCount(prevCount => +(prevCount + toTotal).toFixed(settings.fractionDigits));
      setHistory(prevHistory => [...prevHistory, newRecord]);
  }

  const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      setHistory([]);
      setTotalCount(0);
      setNewNumber(0);
  };

  return (
    <main>
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo"/>
            </a>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </a>
        </div>
        <h1>random generator</h1>
        <div className='main'>
            <SettingsForm
                settings={settings}
                onChange={e => handleInputChange(e, 'from')}
                onChange1={e => handleInputChange(e, 'to')}
                onChange2={e => handleInputChange(e, 'count')}
                onChange3={e => handleInputChange(e, 'fractionDigits')}
                onClick={() => setSettings(defaultSettings)}
            />
            <hr />
            <div className="card">
                <button onClick={handleNewClick}>
                    generate new {settings.count} number{settings.count > 1 && 's'}
                </button>
                <b className="generated-number">
                    generated number{settings.count > 1 && 's'} {settings.count > 1 ? 'are' : 'is'}:
                    <pre>{typeof newNumber === 'number' ? newNumber : newNumber.map(value => <span>{value} </span>)}</pre>
                </b>
                <HistoryList data={history} total={totalCount}/>
                <button onClick={handleClearClick}>clear history</button>
            </div>
        </div>
    </main>
  )
}

export default App
