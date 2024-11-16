import React from 'react';
import { useMask, MaskProps } from '@react-input/mask';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: MaskProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ mask, ...props }, ref) => {
  const maskRef = useMask(mask);

  return (
    <input
      {...props}
      ref={(el) => {
        if (mask) maskRef.current = el;
        if (typeof ref === 'function') ref(el); 
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }}
    />
  );
});

export default Input;
