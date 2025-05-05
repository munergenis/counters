import {
  addCounter,
  deleteCounter,
  editCounter,
  loadInitialData,
  saveCounters,
} from '@/lib/storage/storage';
import { useEffect, useState } from 'react';

import { Counter } from '@/lib/types/counter';
import { initialData } from '@/lib/data/initialData';

export const useCounters = () => {
  const [counters, setCounters] = useState<Counter[]>(loadInitialData());
  const [initialRender, setInitialRender] = useState(
    JSON.parse(localStorage.getItem('initialCounterRender') || 'true')
  );
  const [activeCounterId, setActiveCounterId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialRender) {
      setCounters(initialData);
      saveCounters(initialData);
      setInitialRender(false);
      localStorage.setItem('initialCounterRender', JSON.stringify(false));
    }
  }, [initialRender]);

  const activeCounter =
    counters.find((counter) => counter.id === activeCounterId) || null;

  const onSelectCounter = (counterId: number) => {
    const selectedCounter = counters.find(
      (counter) => counter.id === counterId
    );
    if (!selectedCounter) {
      setError('No se ha podido cargar el contador');
      return;
    }

    setActiveCounterId(selectedCounter.id);
  };

  const onCloseCounter = () => {
    setActiveCounterId(null);
  };

  const onAddCounter = (newCounter: Omit<Counter, 'id'>) => {
    const newCounters = addCounter(newCounter);
    if (!newCounters) {
      setError('No se ha podido añadir el nuevo contador');
      return;
    }

    setCounters(newCounters);
  };

  const onEditCounter = (editingCounter: Counter) => {
    const newCounters = editCounter(editingCounter);
    if (!newCounters) {
      setError('No se ha podido editar el contador');
      return;
    }

    setCounters(newCounters);
  };

  const onDeleteCounter = (deletingCounterId: number) => {
    const newCounters = deleteCounter(deletingCounterId);
    if (!newCounters) {
      setError('No se ha podido borrar el contador');
      return;
    }

    setCounters(newCounters);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]);

  return {
    counters,
    activeCounter,
    error,
    onSelectCounter,
    onCloseCounter,
    onAddCounter,
    onEditCounter,
    onDeleteCounter,
  };
};
