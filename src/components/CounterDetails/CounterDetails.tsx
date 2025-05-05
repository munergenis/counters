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
  const [customValue, setCustomValue] = useState<number | null>(
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
          title: `${today.getDate()}/${today.getMonth() + 1}`,
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

    setCustomValue(isNaN(numValue) || numValue === 0 ? null : numValue);
  };

  const onAddCustomValue = () => {
    if (customValue === null) return;

    onModifyHours(isCustomValueNegative ? -customValue : customValue);
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
              -{opt} hores
            </button>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex flex-col items-center gap-y-2">
        <div
          className="space-x-2"
          onClick={toggleShowCustomValue}
        >
          <label htmlFor="customValue">Valor Personalizado</label>
          <span className="">
            {showCustomValue ? <span>❌</span> : <span>👁️</span>}
          </span>
        </div>
        {showCustomValue && (
          <>
            <input
              className="border-2 text-purple-800 font-semibold border-purple-800 rounded-sm w-3xs text-center"
              id="customValue"
              type="number"
              value={customValue === null ? '' : customValue}
              onChange={handleCustomValueChange}
            />
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
            <div>
              {item.title} {item.substractedHours} hores
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
