import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  func?: (param?: any) => void;
}

const Button: FC<ButtonProps> = ({ children, func }) => {
  return (
    <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-2 text-bold text-white text-xl rounded-xl shadow-xl" onClick={func}>
      {children}
    </button>
  );
};

export default Button;
