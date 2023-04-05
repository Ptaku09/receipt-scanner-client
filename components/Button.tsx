import React, { FC, ReactNode } from 'react';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'], weight: '500' });

interface ButtonProps {
  children: ReactNode;
  func?: (param?: any) => void;
  primary?: boolean;
}

const Button: FC<ButtonProps> = ({ children, func, primary = false }) => {
  return (
    <button
      className={`${
        primary ? 'bg-gradient-to-r from-pink-500 to-violet-500' : 'bg-neutral-400'
      } px-12 py-3 text-bold text-white text-sm rounded-xl shadow-xl ${rubik.className}`}
      onClick={func}
    >
      {children}
    </button>
  );
};

export default Button;
