import React from 'react';

import {TodoDetailHeader} from '@/components/features/navigation/TodoDetailHeader/View';
import {useTodoDetailHeader} from '@/components/features/navigation/TodoDetailHeader/hooks';

export const ConnectedTodoDetailHeader = () => {
    const props = useTodoDetailHeader();
    return React.createElement(TodoDetailHeader, props)
}
