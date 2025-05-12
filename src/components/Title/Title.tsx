import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Title = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="text-4xl text-center w-min py-8 uppercase font-semibold text-transparent bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text">
        {children}
      </div>
    </div>
  );
};
