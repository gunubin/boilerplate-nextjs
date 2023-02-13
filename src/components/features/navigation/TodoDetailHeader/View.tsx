import React from 'react';

import {BackButton} from '@/components/features/navigation/BackButton';
import {Todo} from '@/domain/todo/Todo';

type Props = {
  item?: Todo;
};

export const TodoDetailHeader: React.FC<Props> = ({item}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {item?.title}
        </a>
        <BackButton />
      </div>
    </nav>
  );
};
