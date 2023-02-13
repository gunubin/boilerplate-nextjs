import React from 'react';

import {TodoListItem} from '@/components/ui/TodoListItem';
import {Todo, TodoId} from '@/domain/todo/Todo';

type Props = {
  list: Todo[];
  onPressRemove: (id: TodoId) => void;
};

export const TodoList: React.FC<Props> = ({list, onPressRemove}) => {
  const items = list.map((item) => {
    return (
      <TodoListItem
        key={item.id}
        title={item.title}
        onPressRemove={() => onPressRemove(item.id) /*useCallback*/}
      />
    );
  });
  return <div className="list-group">{items}</div>;
};
