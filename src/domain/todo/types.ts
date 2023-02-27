import {Todo} from '@/domain/todo/Todo';
import {TodoId} from '@/domain/todo/TodoId';

export interface ITodoListService {
  add(params: {item: Todo}): void;
  update(params: {item: Todo}): void;
  remove(params: {id: TodoId}): void;
}
