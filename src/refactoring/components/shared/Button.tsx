import { ButtonHTMLAttributes } from 'react';

const BUTTON_SIZE: Record<ButtonSize, string> = {
  m: 'px-2 py-1',
  l: 'p-2',
  xl: 'px-3 py-1',
  '2xl': 'px-4 py-2',
  none: '',
};

const BUTTON_COLOR: Record<ButtonColor, string> = {
  blue: 'bg-blue-500 text-white hover:bg-blue-600',
  green: 'bg-green-500 text-white hover:bg-green-600',
  red: 'bg-red-500 text-white hover:bg-red-600',
  gray: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
  disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
  none: '',
};

type ButtonSize = 'm' | 'l' | 'xl' | '2xl' | 'none';
type ButtonColor = 'blue' | 'green' | 'red' | 'gray' | 'disabled' | 'none';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  size?: ButtonSize;
  colorVariants?: ButtonColor;
};

export const Button = ({
  type = 'button',
  className = '',

  text,
  size = 'm',
  colorVariants = 'blue',
  disabled,

  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${BUTTON_SIZE[size]} ${
        disabled ? BUTTON_COLOR['disabled'] : BUTTON_COLOR[colorVariants]
      } rounded ${className}`}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
};
