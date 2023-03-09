import React from 'react';
import Skeleton from './Skeleton';
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import PhotosListItem from './PhotosListItem';
import Button from './Button';

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content = '';
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>{error.message}</div>;
  } else if (!isFetching) {
    content = data.map((photo) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }



  return (
    <div>
      <div className="m-3 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button success loading={isFetching || results.isLoading} onClick={handleAddPhoto}>+ Add Photo</Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
    </div>
  );
};

export default PhotosList;
