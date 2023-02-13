import {TodoId, Todo} from '@/domain/todo/Todo';

export interface ITodoListService {
  add(params: {item: Todo}): void;
  update(params: {item: Todo}): void;
  remove(params: {id: TodoId}): void;
}
