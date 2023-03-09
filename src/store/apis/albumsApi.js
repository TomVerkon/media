import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { pause } from '../utility';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    fetchFn: async (...args) => {
      await pause();
      return fetch(...args);
    }
  }),
  endpoints: (builder) => ({
    fetchAlbums: builder.query({
      // the 3rd arg in this case is user object 
      // which was passed in to the query
      providesTags: (result, error, user) => {
        const tags = result.map((album) => {
          return { type: 'Album', id: album.id };
        });
        tags.push({ type: 'UsersAlbums', id: user.id });
        return tags;
      },
      query: (user) => {
        return {
          url: '/albums',
          params: {
            userId: user.id
          },
          method: 'GET'
        };
      }
    }),
    addAlbum: builder.mutation({
      // the 3rd arg in this case is user object
      // which was passed in to the query
      invalidatesTags: (result, error, user) => {
        return [{ type: 'UsersAlbums', id: user.id }];
      },
      query: (user) => {
        return {
          url: '/albums',
          method: 'POST',
          body: {
            userId: user.id,
            title: faker.commerce.productName()
          }
        };
      }
    }),
    removeAlbum: builder.mutation({
      // the 3rd arg in this case is album object
      // which was passed in to the query
      invalidatesTags: (result, error, album) => {
        return [{ type: 'Album', id: album.id }];
      },
      query: (album) => {
        return {
          url: `/albums/${album.id}`,
          method: 'DELETE',
        };
      }

    })
  })
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation
} = albumsApi;
export { albumsApi };