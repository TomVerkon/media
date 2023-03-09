import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pause } from '../utility';

const removeUser = createAsyncThunk(
  'users/remove',
  async (user) => {
    console.log('user id: ', user.id);
    await axios.delete(process.env.REACT_APP_BASE_URL + `/users/${user.id}`);

    // Dev only
    await pause();

    return user;
  }
);

export { removeUser };;