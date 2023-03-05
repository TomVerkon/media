import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from 'axios';
import { faker } from '@faker-js/faker';


const addUser = createAsyncThunk('user/add', async () => {

  const response = await axios.post('http://localhost:3005/users', {
    "id": nanoid(),
    "name": faker.name.fullName()
  });

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


export { addUser };