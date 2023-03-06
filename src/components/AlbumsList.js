import React from 'react';
import { useFetchAlbumsQuery } from '../store';
import Skeleton from './Skeleton';

export default function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  //console.log(user);
  console.log(data, error, isLoading);

  let content = '';
  if (isLoading) {
    content = <Skeleton times={2} className="h-10 w-full" />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else if (!isLoading) {
    content = data.map((album) => {
      return < div key={album.id}> {album.title}</div >;
    });
  }


  return (
    <div>
      Albums for {user.name}
      {content}
    </div>
  );
};

