import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const response = await axios.get('http://localhost:3005/users');

    // Dev only
    //await pause(500);

    return response.data;
  });

// Dev Only
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };