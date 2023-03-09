import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { pause } from '../utility';

const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const response = await axios.get(process.env.REACT_APP_BASE_URL + '/users');

    // Dev only
    await pause();

    return response.data;
  });

export { fetchUsers };