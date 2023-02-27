import Head from 'next/head';

import {TodoDetailLayout} from '@/components/features/layouts/TodoDetailLayout';
import {ConnectedTodoEditForm} from '@/components/features/todo/TodoEditForm';
import {useTodoDetailPage} from '@/pages/todo/hooks';

export default function TodoDetailPage() {
  const {item} = useTodoDetailPage();
  return (
    <>
      <Head>
        <title>{item?.title}</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoDetailLayout>
        <div className="container mt-5">
          <ConnectedTodoEditForm />
        </div>
      </TodoDetailLayout>
    </>
  );
}
