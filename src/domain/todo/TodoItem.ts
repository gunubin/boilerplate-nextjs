export type TodoItem = string & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const TodoItem = {
  create: (val: string) => val as TodoItem,
};
