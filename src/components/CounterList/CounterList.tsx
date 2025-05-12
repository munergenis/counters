import { Counter } from '@/lib/types/counter';

interface Props {
  counters: Counter[];
  onSelectCounter: (counterId: number) => void;
}

export const CounterList = ({ counters, onSelectCounter }: Props) => {
  if (counters.length === 0) {
    return (
      <div className="text-center py-8 font-bold text-accent italic text-xl">
        Afegeix un nou Counter
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {counters.map((counter) => (
        <li
          key={counter.id}
          className="text-center flex flex-col gap-2 bg-secondary p-4 rounded-sm shadow"
          onClick={() => onSelectCounter(counter.id)}
        >
          <h2 className="text-2xl">{counter.title}</h2>
          <p className="text-5xl text-primary">{counter.remainingHours}</p>
        </li>
      ))}
    </ul>
  );
};
