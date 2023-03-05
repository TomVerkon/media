import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser, removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';


function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doAddUser, isCreatingingUser, creatingUserError] = useThunk(addUser);
  const { data } = useSelector((state) => state.users);

  useEffect(() => doFetchUsers(), [doFetchUsers]);

  const handleUserAdd = () => doAddUser();

  let content = '';
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>`Error fetching data: ${loadingUsersError.message}`</div>;
  } else if (!isLoadingUsers) {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingingUser} primary onClick={handleUserAdd}>
          + Add User
        </Button>
      </div>
      {content}
    </div>
  );
}

export default UsersList;
