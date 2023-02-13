import Head from 'next/head';
import Image from 'next/image';

import {HomeLayout} from '@/components/features/layouts/HomeLayout';
import {ConnectedTodoInputForm} from '@/components/features/todo/TodoInputForm';
import {ConnectedTodoList} from '@/components/features/todo/TodoList';

export default function Home() {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeLayout>
        <div className="container">
          <div className="mt-5">
            <ConnectedTodoInputForm />
            <ConnectedTodoList />
          </div>
        </div>
      </HomeLayout>
    </>
  );
}
