import React from 'react';

type Props = {
  label: string;
};

export const Button: React.FC<Props> = ({label}) => {
  return <button>{label}</button>;
};
