import { ChangeEvent, useState } from 'react';

import { Counter } from '@/lib/types/counter';
import { DEFAULT_SUBSTRACTING_OPTION_VALUE } from '@/lib/config/consts';

interface Props {
  activeCounter: Counter;
  onCloseCounter: () => void;
  onEditCounter: (counter: Counter) => void;
  onDeleteCounter: (counterId: number) => void;
}

export const CounterDetails = ({
  activeCounter,
  onCloseCounter,
  onEditCounter,
  onDeleteCounter,
}: Props) => {
  const [customValueDay, setCustomValueDay] = useState(
    `${new Date().getDate()}`
  );
  const [customValueMonth, setCustomValueMonth] = useState(
    `${new Date().getMonth() + 1}`
  );
  const [customValueTime, setCustomValueTime] = useState<number | null>(
    DEFAULT_SUBSTRACTING_OPTION_VALUE
  );
  const [isCustomValueNegative, setIsCustomValueNegative] = useState(true);
  const [showCustomValue, setShowCustomValue] = useState(false);

  const onModifyHours = (value: number) => {
    const today = new Date();
    const newCounter: Counter = {
      ...activeCounter,
      remainingHours: activeCounter.remainingHours + value,
      additions: [
        ...activeCounter.additions,
        {
          date: `${today.getDate()}/${today.getMonth() + 1}`,
          substractedHours: value,
        },
      ],
    };
    onEditCounter(newCounter);
  };

  const toggleShowCustomValue = () => {
    setShowCustomValue((pValue) => !pValue);
  };

  const handleCustomValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numValue = Number(value);

    setCustomValueTime(isNaN(numValue) || numValue === 0 ? null : numValue);
  };

  const onAddCustomValue = () => {
    if (customValueTime === null) return;

    const formattedCustomValueTime = isCustomValueNegative
      ? -customValueTime
      : customValueTime;

    const newCounter: Counter = {
      ...activeCounter,
      remainingHours: activeCounter.remainingHours + formattedCustomValueTime,
      additions: [
        ...activeCounter.additions,
        {
          date: `${customValueDay}/${customValueMonth}`,
          substractedHours: formattedCustomValueTime,
        },
      ],
    };
    onEditCounter(newCounter);
  };

  const onDeleteAddition = (index: number) => {
    const additionEntry = activeCounter.additions[index];
    const newCounter: Counter = {
      ...activeCounter,
      remainingHours:
        activeCounter.remainingHours - additionEntry.substractedHours,
      additions: activeCounter.additions.filter((_, i) => i !== index),
    };

    onEditCounter(newCounter);
  };

  const handleDeleteCounter = () => {
    onDeleteCounter(activeCounter.id);
    onCloseCounter();
  };

  return (
    <div className="text-center flex flex-col gap-4">
      <button
        className="absolute top-0 right-2 p-4 text-4xl font-black cursor-pointer"
        onClick={onCloseCounter}
      >
        &times;
      </button>

      {/* DETAILS */}
      <h2 className="text-3xl">{activeCounter.title}</h2>
      <p className="text-7xl">{activeCounter.remainingHours}</p>

      {/* BUTTONS */}
      <div className="flex flex-col gap-2">
        {activeCounter.substractingOptions.map((opt, i) => (
          <div
            key={i}
            className="flex gap-2"
          >
            <button
              className="grow bg-purple-100 px-4 py-2 rounded-lg shadow-sm shadow-purple-600/30"
              onClick={() => onModifyHours(-opt)}
            >
              -{opt}h
            </button>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="my-4 flex border-2 border-purple-100 shadow-lg rounded-sm py-4 flex-col items-center gap-y-2">
        <div
          className="space-x-2"
          onClick={toggleShowCustomValue}
        >
          <label htmlFor="customValueTime">Valor Personalizado</label>
          <span className="">
            {showCustomValue ? <span>❌</span> : <span>👁️</span>}
          </span>
        </div>
        {showCustomValue && (
          <>
            <div className="flex space-x-2">
              <div className="flex flex-col bg-purple-100 shadow-lg rounded-sm p-4">
                <div className="space-x-1">
                  <input
                    className="text-purple-800 bg-purple-50 font-semibold rounded-sm w-8 text-center"
                    id="customValueDay"
                    type="text"
                    value={customValueDay}
                    onChange={(e) => setCustomValueDay(e.target.value)}
                  />
                  <span>/</span>
                  <input
                    className="text-purple-800 bg-purple-50 font-semibold rounded-sm w-8 text-center"
                    id="customValueMonth"
                    type="text"
                    value={customValueMonth}
                    onChange={(e) => setCustomValueMonth(e.target.value)}
                  />
                </div>
                <span>Fecha</span>
              </div>
              <div className="flex flex-col bg-purple-100 shadow-lg rounded-sm p-4">
                <input
                  className="text-purple-800 bg-purple-50 font-semibold rounded-sm w-16 text-center"
                  id="customValueTime"
                  type="number"
                  value={customValueTime === null ? '' : customValueTime}
                  onChange={handleCustomValueChange}
                />
                <span>Horas</span>
              </div>
            </div>
            <div className="space-x-2">
              <input
                type="checkbox"
                id="negativeCustomValue"
                checked={isCustomValueNegative}
                onChange={(e) => setIsCustomValueNegative(e.target.checked)}
              />
              <label htmlFor="negativeCustomValue">Negativas</label>
            </div>
            <button
              className="bg-purple-400 text-white px-4 py-2 rounded-sm font-semibold"
              onClick={onAddCustomValue}
            >
              Añadir
            </button>
          </>
        )}
      </div>

      {/* LIST */}
      <div className="flex flex-col gap-2">
        {activeCounter.additions.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 bg-gray-50 shadow"
          >
            <div>{item.date}</div>
            <div
              className={`${
                item.substractedHours < 0 ? 'text-purple-500' : 'text-green-400'
              } font-bold`}
            >
              {item.substractedHours} horas
            </div>
            <button
              className="text-xl font-bold p-2 cursor-pointer"
              onClick={() => onDeleteAddition(i)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* DELETE */}
      <button
        className="bg-red-400 py-4 rounded-sm uppercase font-semibold text-red-950"
        onClick={handleDeleteCounter}
      >
        Borrar
      </button>
    </div>
  );
};
