import { InputHTMLAttributes } from 'react';

const LABEL_STYLE: Record<LabelSize, string> = {
  m: 'block text-sm font-medium text-gray-700',
  l: 'block mb-1',
};

type LabelSize = 'm' | 'l';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelSize?: LabelSize;
};

export const Input = ({
  className,
  id,
  label,
  labelSize = 'm',
  ...rest
}: InputProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className={LABEL_STYLE[labelSize]}>
          {label}
        </label>
      )}
      <input id={id} className="w-full p-2 border rounded" {...rest} />
    </div>
  );
};
