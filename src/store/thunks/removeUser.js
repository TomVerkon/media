import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk(
  'users/remove',
  async (user) => {
    console.log('user id: ', user.id);
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    // Dev only
    await pause(500);

    return user;
  }
);

// Dev Only
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { removeUser };;