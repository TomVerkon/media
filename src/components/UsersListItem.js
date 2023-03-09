import React, { Fragment } from 'react';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleRemoveUser = () => doRemoveUser(user);

  const header = (
    <>
      <Button danger className="mr-3" onClick={handleRemoveUser} loading={isLoading}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>);

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
