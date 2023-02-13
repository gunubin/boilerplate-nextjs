import React from 'react';

type Props = {
  label: string;
  onPress: () => void;
};

export const Button: React.FC<Props> = ({label, onPress}) => {
  return (
    <button className="btn btn-primary" onClick={onPress}>
      {label}
    </button>
  );
};
