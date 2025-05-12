import { ReactNode } from 'react';

export const FormError = ({ children }: { children: ReactNode }) => {
  return <div className="text-error text-sm">{children}</div>;
};
