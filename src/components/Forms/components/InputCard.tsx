import { ReactNode } from 'react';

interface InputCardProps {
  className?: string;
  children: ReactNode;
}

export const InputCard = ({ className, children }: InputCardProps) => {
  return (
    <div
      className={`flex flex-col text-black bg-card-secondary p-2 font-semibold rounded-sm ${className}`}
    >
      {children}
    </div>
  );
};
