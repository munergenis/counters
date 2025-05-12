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
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };
  const handleDeleteCounter = () => {
    onDeleteCounter(activeCounter.id);
    setShowConfirmation(false);
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
              className="grow bg-card-secondary font-semibold text-lg px-4 py-2 rounded-lg shadow-sm shadow-purple-600/30"
              onClick={() => onModifyHours(-opt)}
            >
              -{opt}H
            </button>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="my-4 flex border-2 border-card-secondary shadow-lg rounded-sm py-4 flex-col items-center gap-y-2">
        <div
          className="space-x-2"
          onClick={toggleShowCustomValue}
        >
          <label htmlFor="customValueTime">Valor Personalitzat</label>
          <span className="">
            {showCustomValue ? <span>❌</span> : <span>👁️</span>}
          </span>
        </div>
        {showCustomValue && (
          <>
            <div className="flex space-x-2">
              <div className="flex flex-col bg-card-secondary shadow-lg rounded-sm p-4">
                <div className="space-x-1">
                  <input
                    className="bg-secondary font-semibold rounded-sm w-10 text-center"
                    id="customValueDay"
                    type="text"
                    value={customValueDay}
                    onChange={(e) => setCustomValueDay(e.target.value)}
                  />
                  <span>/</span>
                  <input
                    className="bg-secondary font-semibold rounded-sm w-10 text-center"
                    id="customValueMonth"
                    type="text"
                    value={customValueMonth}
                    onChange={(e) => setCustomValueMonth(e.target.value)}
                  />
                </div>
                <span className="text-sm italic">Data</span>
              </div>
              <div className="flex flex-col bg-card-secondary shadow-lg rounded-sm p-4">
                <input
                  className="bg-secondary font-semibold rounded-sm w-16 text-center"
                  id="customValueTime"
                  type="number"
                  value={customValueTime === null ? '' : customValueTime}
                  onChange={handleCustomValueChange}
                />
                <span className="text-sm italic">Hores</span>
              </div>
            </div>
            <div className="space-x-2">
              <input
                className="accent-accent-dark"
                type="checkbox"
                id="negativeCustomValue"
                checked={isCustomValueNegative}
                onChange={(e) => setIsCustomValueNegative(e.target.checked)}
              />
              <label htmlFor="negativeCustomValue">Negatives</label>
            </div>
            <button
              className="bg-primary text-white px-4 py-2 rounded-sm font-semibold"
              onClick={onAddCustomValue}
            >
              Afegir
            </button>
          </>
        )}
      </div>

      {/* LIST */}
      <div className=" flex flex-col gap-2">
        {activeCounter.additions.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-3 items-center justify-between px-4 bg-secondary shadow"
          >
            <div className="text-left">{item.date}</div>
            <div
              className={`${
                item.substractedHours < 0 ? 'text-primary' : 'text-green-700'
              } font-bold text-center`}
            >
              {item.substractedHours} hores
            </div>
            <button
              className="text-xl text-right font-bold p-2 cursor-pointer"
              onClick={() => onDeleteAddition(i)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* DELETE */}
      <div className="mt-4">
        {showConfirmation ? (
          <div>
            <div>Vols esborrar definitivament el Counter?</div>
            <div className="font-bold text-lg text-red-400">
              Acció irreversible
            </div>

            <div className="flex gap-x-4">
              <button
                className="grow bg-secondary rounded-sm font-bold text-lg"
                onClick={handleCancelConfirmation}
              >
                Cancelar
              </button>
              <button
                className="grow bg-red-400 py-4 rounded-sm font-bold text-lg"
                onClick={handleDeleteCounter}
              >
                Borrar
              </button>
            </div>
          </div>
        ) : (
          <button
            className="w-full bg-red-400 py-4 rounded-sm uppercase font-bold tracking-wider text-black"
            onClick={handleShowConfirmation}
          >
            Borrar Counter
          </button>
        )}
      </div>
    </div>
  );
};
