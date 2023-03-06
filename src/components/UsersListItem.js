import React, { Fragment } from 'react';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';
import ErrorBoundary from './ErrorBoundry';

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleRemoveUser = () => doRemoveUser(user);

  const header = <Fragment>
    <Button danger className="mr-3" onClick={handleRemoveUser} loading={isLoading}>
      <GoTrashcan />
    </Button>
    {error && <div>Error deleting user.</div>}
    {user.name}
  </Fragment>;

  return (
    <ExpandablePanel header={header}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <AlbumsList user={user} />
      </ErrorBoundary>
    </ExpandablePanel>
  );
};

export default UsersListItem;
