import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { pause } from '../utility';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    fetchFn: async (...args) => {
      await pause();
      return fetch(...args);
    }
  }),
  endpoints: (builder) => ({
    fetchPhotos: builder.query({
      // the 3rd arg in this case is album object
      providesTags: (result, error, album) => {
        const tags = result.map((photo) => {
          return { type: 'Photo', id: photo.id };
        });
        tags.push({ type: 'AlbumPhotos', id: album.id });
        return tags;
      },
      query: (album) => {
        return {
          url: '/photos',
          params: {
            albumId: album.id
          },
          method: 'GET'
        };
      }

    }),
    addPhoto: builder.mutation({
      // arg in this case is user object
      invalidatesTags: (result, error, album) => {
        return [{ type: 'AlbumPhotos', id: album.id }];
      },
      query: (album) => {
        return {
          url: '/photos',
          method: 'POST',
          body: {
            albumId: album.id,
            url: faker.image.abstract(150, 150, true)
          }
        };
      }
    }),
    removePhoto: builder.mutation({
      invalidatesTags: (result, error, photo) => {
        return [{ type: 'Photo', id: photo.id }];
      },
      query: (photo) => {
        return {
          url: `/photos/${photo.id}`,
          method: 'DELETE',
        };
      }

    })
  })
});
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation
} = photosApi;
export { photosApi };