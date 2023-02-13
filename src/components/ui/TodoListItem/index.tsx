import React from 'react';

type Props = {
  title: string;
  onPressRemove: () => void;
};

export const TodoListItem: React.FC<Props> = ({onPressRemove, title}) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col">
          <div>{title}</div>
        </div>
        <div onClick={onPressRemove} className="col">
          削除
        </div>
      </div>
    </div>
  );
};
