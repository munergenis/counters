import { Counter } from '@/lib/types/counter';
import { NewCounterForm } from '../Forms/NewCounterForm/NewCounterForm';
import { ReactNode } from 'react';

interface Props {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  onAddCounter: (newCounter: Omit<Counter, 'id'>) => void;
}

export const AddCounterButton = ({
  openModal,
  closeModal,
  onAddCounter,
}: Props) => {
  const handleClick = () => {
    openModal(
      <NewCounterForm
        onAddCounter={onAddCounter}
        closeModal={closeModal}
      />
    );
  };
  return (
    <button
      className="text-center bg-accent text-black py-4 rounded-sm text-2xl font-semibold uppercase cursor-pointer"
      onClick={handleClick}
    >
      Nou
    </button>
  );
};
