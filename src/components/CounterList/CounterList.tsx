import { Counter } from '@/lib/types/counter';

interface Props {
  counters: Counter[];
  onSelectCounter: (counterId: number) => void;
}

export const CounterList = ({ counters, onSelectCounter }: Props) => {
  if (counters.length === 0) {
    return (
      <div className="text-center py-8 uppercase font-bold text-green-700 text-xl">
        Añade un contador
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {counters.map((counter) => (
        <li
          key={counter.id}
          className="text-center flex flex-col gap-2 bg-gray-50 p-4 rounded-sm shadow"
          onClick={() => onSelectCounter(counter.id)}
        >
          <h2 className="text-2xl">{counter.title}</h2>
          <p className="text-5xl">{counter.remainingHours}</p>
          {/* <div className="flex flex-col gap-2">
            {counter.substractingOptions.map((opt, i) => (
              <button
                key={i}
                className="bg-amber-100 px-4 py-2 rounded-lg shadow-xl"
              >
                {opt}
              </button>
            ))}
          </div> */}
        </li>
      ))}
    </ul>
  );
};
