import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { pause } from "../utility";


const addUser = createAsyncThunk('user/add', async () => {

  const response = await axios.post(process.env.REACT_APP_BASE_URL + '/users', {
    "id": nanoid(),
    "name": faker.name.fullName()
  });

  // Dev only
  await pause();

  return response.data;
});

export { addUser };