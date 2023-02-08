import {TodoItem} from "@/domain/todo/TodoItem";

export interface ITodoList {
    add(params: TodoItem): void;
}
