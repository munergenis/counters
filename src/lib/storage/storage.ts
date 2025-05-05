import { Counter } from '../types/counter';
import { initialData } from '../data/initialData';

export const loadInitialData: () => Counter[] = () => {
  const storedData = localStorage.getItem('counters');

  if (storedData) {
    return JSON.parse(storedData);
  }

  return initialData;
};

export const saveCounters: (counters: Counter[]) => void = (counters) => {
  localStorage.setItem('counters', JSON.stringify(counters));
};

export const addCounter: (
  addingCounter: Omit<Counter, 'id'>
) => Counter[] | undefined = (addingCounter) => {
  const countersRaw = localStorage.getItem('counters');
  if (!countersRaw) return;

  const savedCounters: Counter[] = JSON.parse(countersRaw);

  const newCounter = {
    ...addingCounter,
    id: Date.now(),
  };
  savedCounters.unshift(newCounter);

  localStorage.setItem('counters', JSON.stringify(savedCounters));
  return savedCounters;
};

export const editCounter: (editingCounter: Counter) => Counter[] | undefined = (
  editingCounter
) => {
  const countersRaw = localStorage.getItem('counters');
  if (!countersRaw) return;

  const savedCounters: Counter[] = JSON.parse(countersRaw);

  const editingCounterIndex = savedCounters.findIndex(
    (sCounter) => sCounter.id === editingCounter.id
  );
  if (editingCounterIndex < 0) return;

  const newCounters = savedCounters.map((counter) =>
    counter.id === editingCounter.id ? editingCounter : counter
  );
  localStorage.setItem('counters', JSON.stringify(newCounters));
  return newCounters;
};

export const deleteCounter: (
  deletingCounterId: number
) => Counter[] | undefined = (deletingCounterId) => {
  const countersRaw = localStorage.getItem('counters');
  if (!countersRaw) return;

  const savedCounters: Counter[] = JSON.parse(countersRaw);

  const deletingCounterIndex = savedCounters.findIndex(
    (sCounter) => sCounter.id === deletingCounterId
  );
  if (deletingCounterIndex < 0) return;

  const newCounters = savedCounters.filter(
    (counter) => counter.id !== deletingCounterId
  );
  localStorage.setItem('counters', JSON.stringify(newCounters));
  return newCounters;
};
