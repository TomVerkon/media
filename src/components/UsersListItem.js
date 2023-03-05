import React from 'react';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import { IoRemoveCircle } from 'react-icons/io5';
import Button from './Button';

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleRemoveUser = () => {
    doRemoveUser(user);
  };

  return (
    < div className="mb-2 rounded border ml-3 mr-3" >
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          <Button danger onClick={handleRemoveUser} loading={isLoading}>
            <IoRemoveCircle />
          </Button>
          {user.name}
        </div>
      </div>
    </div >
  );
};

export default UsersListItem;
