export type TodoId = string & {readonly brand: unique symbol};

export type TodoStatus = 'pending' | 'done' | 'trash';

export type Todo = {
  status: TodoStatus;
  createdAt: string;
  id: TodoId;
  title: string;
  description?: string;
} & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const Todo = {
  create: ({description, title}: {title: string; description?: string}): Todo => {
    return {
      createdAt: new Date().toString(),
      description,
      id: Date.now().toString(),
      status: 'pending',
      title,
    } as Todo;
  },
};
