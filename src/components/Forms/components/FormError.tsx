import { ReactNode } from 'react';

export const FormError = ({ children }: { children: ReactNode }) => {
  return <div className="text-red-500 text-sm">{children}</div>;
};
