import { ReactNode } from 'react';

interface ArrayButtonProps {
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export const ArrayButton = ({
  className,
  onClick,
  disabled,
  children,
}: ArrayButtonProps) => {
  return (
    <button
      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xl bg-secondary disabled:hidden ${className}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
