import {createApi} from '@reduxjs/toolkit/query/react';

import {appBaseQuery} from '@/lib/redux/appBaseQuery';

export const appApi = createApi({
  baseQuery: appBaseQuery(() => process.env.NEXT_PUBLIC_API_BASE_URL),
  endpoints: () => ({}),
  reducerPath: 'appApi',
  tagTypes: ['Todo'],
});
